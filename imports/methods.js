import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { FicsCollection, ChaptersCollection } from "/imports/collections";
import { __ } from "/imports/ui/i18n";

Meteor.methods({
  "fics.insert": function (title, description) {
    if (!this.userId) throw new Meteor.Error("Not authorized.");

    check(title, String);
    check(description, String);

    const ficId = FicsCollection.insert({
      title,
      description,
      createdAt: new Date(),
      userId: this.userId,
    });

    Meteor.call("chapters.insert", __("methods.new_chapter_title"), "", ficId);

    return ficId;
  },

  "fics.publish": function (id) {
    if (!this.userId) throw new Meteor.Error("Not authorized.");

    check(id, String);

    FicsCollection.update(id, {
      $set: {
        status: "published",
        updatedAt: new Date(),
      },
    });
  },

  "fics.wip": function (id) {
    if (!this.userId) throw new Meteor.Error("Not authorized.");

    check(id, String);

    FicsCollection.update(id, {
      $set: {
        status: "wip",
        updatedAt: new Date(),
      },
    });
  },

  "chapters.insert": function (title, body, ficId) {
    if (!this.userId) throw new Meteor.Error("Not authorized.");

    check(title, String);
    check(body, String);
    check(ficId, String);

    const lastChapter = ChaptersCollection.findOne(
      { ficId },
      { sort: { order: -1 } }
    );
    const order = lastChapter ? lastChapter.order + 1 : 0;

    ChaptersCollection.insert({
      title,
      body,
      ficId,
      order,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  "chapters.delete": function (chapterId) {
    if (!this.userId) throw new Meteor.Error("Not authorized.");

    check(chapterId, String);

    const chapter = ChaptersCollection.findOne(chapterId);
    if (ChaptersCollection.find({ ficId: chapter.ficId }).count() <= 1) {
      throw new Meteor.Error(__("methods.chapters.delete"));
    }

    ChaptersCollection.remove({
      _id: chapterId,
      userId: this.userId,
    });
  },

  "chapters.update": function ({ _id, title, body, ficId }) {
    if (!this.userId) throw new Meteor.Error("Not authorized.");

    check(_id, String);
    check(title, String);
    check(body, String);
    check(ficId, String);

    ChaptersCollection.update(
      { _id, userId: this.userId },
      {
        $set: {
          title,
          body,
          ficId,
          updatedAt: new Date(),
        },
      }
    );
  },

  "chapters.moveUp": function ({ _id, ficId, order }) {
    if (!this.userId) throw new Meteor.Error("Not authorized.");

    check(_id, String);
    check(ficId, String);
    check(order, Number);

    if (order === 0) return; // nothing to do

    const oldOrder = order;
    const chapterOnTopOfThisOne = ChaptersCollection.findOne(
      { userId: this.userId, ficId, order: { $lt: order } },
      { sort: { order: -1 } }
    );

    if (!chapterOnTopOfThisOne) return;

    const newOrder = chapterOnTopOfThisOne.order;

    ChaptersCollection.update(
      { _id: chapterOnTopOfThisOne._id, userId: this.userId },
      {
        $set: {
          order: oldOrder,
          updatedAt: new Date(),
        },
      }
    );

    ChaptersCollection.update(
      { _id, userId: this.userId },
      {
        $set: {
          order: newOrder,
          updatedAt: new Date(),
        },
      }
    );
  },

  "chapters.moveDown": function ({ _id, ficId, order }) {
    if (!this.userId) throw new Meteor.Error("Not authorized.");

    check(_id, String);
    check(ficId, String);
    check(order, Number);

    const oldOrder = order;
    const chapterBelowThisOne = ChaptersCollection.findOne(
      { userId: this.userId, ficId, order: { $gt: order } },
      { sort: { order: 1 } }
    );

    if (!chapterBelowThisOne) return;

    const newOrder = chapterBelowThisOne.order;

    ChaptersCollection.update(
      { _id: chapterBelowThisOne._id, userId: this.userId },
      {
        $set: {
          order: oldOrder,
          updatedAt: new Date(),
        },
      }
    );

    ChaptersCollection.update(
      { _id, userId: this.userId },
      {
        $set: {
          order: newOrder,
          updatedAt: new Date(),
        },
      }
    );
  },
});
