import { Meteor } from "meteor/meteor";
import { FicsCollection, ChaptersCollection } from "/imports/collections";

Meteor.publish("fics", () => FicsCollection.find({}));
Meteor.publish("chapters", () => ChaptersCollection.find({}));
