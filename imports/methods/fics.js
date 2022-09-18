import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import FicsCollection from "/imports/db/FicsCollection";

Meteor.methods({
  "fics.insert": function (title, description) {
    check(title, String);
    check(description, String);

    // if (!this.userId) {
    //   throw new Meteor.Error("Not authorized.");
    // }

    FicsCollection.insert({
      title,
      description,
      createdAt: new Date(),
      // userId: this.userId,
    });
  },
});
