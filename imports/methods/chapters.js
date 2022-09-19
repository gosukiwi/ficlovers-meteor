import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { ChaptersCollection } from "/imports/collections";

Meteor.methods({
  "chapters.insert": function (title, body, ficId) {
    if (!this.userId) throw new Meteor.Error("Not authorized.");

    check(title, String);
    check(body, String);
    check(ficId, String);

    ChaptersCollection.insert({
      title,
      body,
      createdAt: new Date(),
      userId: this.userId,
      ficId,
    });
  },
});
