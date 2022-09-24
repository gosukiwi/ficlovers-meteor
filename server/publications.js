import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { FicsCollection, ChaptersCollection } from "/imports/collections";

Meteor.publish("fics.user", function () {
  return FicsCollection.find({ userId: this.userId });
});

Meteor.publish("fics.show", (id) => {
  check(id, String);

  return FicsCollection.find({ _id: id, status: "published" });
});

Meteor.publish("chapters.show", function (ficId) {
  check(ficId, String);

  const fic = FicsCollection.findOne({ _id: ficId, status: "published" });
  if (!fic) return this.ready(); // empty if fic is not published

  return ChaptersCollection.find({ ficId });
});

Meteor.publish("chapters.user", function () {
  return ChaptersCollection.find({ userId: this.userId });
});
