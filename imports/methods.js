import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { FicsCollection, ChaptersCollection } from "/imports/collections";

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

    ChaptersCollection.remove({
      _id: chapterId,
      userId: this.userId,
    });
  },
});
