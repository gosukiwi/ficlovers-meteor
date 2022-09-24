import { Meteor } from "meteor/meteor";
import { FicsCollection, ChaptersCollection } from "/imports/collections";

Meteor.publish("fics.user", function () {
  return FicsCollection.find({ userId: this.userId });
});

Meteor.publish("chapters.user", function () {
  return ChaptersCollection.find({ userId: this.userId });
});
