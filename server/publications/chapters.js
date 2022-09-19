import { Meteor } from "meteor/meteor";
import { ChaptersCollection } from "/imports/collections";

Meteor.publish("chapters", () => {
  return ChaptersCollection.find({});
});
