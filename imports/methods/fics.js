import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import FicsCollection from "/imports/db/FicsCollection";

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
});
