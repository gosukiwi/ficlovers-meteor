import { Meteor } from "meteor/meteor";
import FicsCollection from "/imports/db/FicsCollection";

Meteor.publish("fics", () => {
  return FicsCollection.find({});
});
