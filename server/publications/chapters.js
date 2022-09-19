import { Meteor } from "meteor/meteor";
import ChaptersCollection from "/imports/db/ChaptersCollection";

Meteor.publish("chapters", () => {
  return ChaptersCollection.find({});
});
