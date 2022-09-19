import { Meteor } from "meteor/meteor";
import { FicsCollection } from "/imports/collections";

Meteor.publish("fics", () => {
  return FicsCollection.find({});
});
