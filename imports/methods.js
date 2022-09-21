import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { FicsCollection, ChaptersCollection } from "/imports/collections";
import { __ } from "/imports/ui/i18n";

Meteor.methods({
  "fics.insert": function (title, description) {
    if (!this.userId) throw new Meteor.Error("Not authorized.");

    check(title, String);
    check(description, String);

    FicsCollection.insert({
      title,
      description,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  "chapters.insert": function (title, body, ficId) {
    if (!this.userId) throw new Meteor.Error("Not authorized.");

    check(title, String);
    check(body, String);
    check(ficId, String);

    ChaptersCollection.insert({
      title,
      body,
      ficId,
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
});
