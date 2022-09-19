import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

export const FicsCollection = new Mongo.Collection("fics");
FicsCollection.attachSchema(
  new SimpleSchema({
    title: { type: String, label: "Title", max: 50 },
    description: { type: String, label: "Description", max: 500 },
    userId: { type: String },
  })
);

export const ChaptersCollection = new Mongo.Collection("chapters");
ChaptersCollection.attachSchema(
  new SimpleSchema({
    title: { type: String, label: "Title", max: 50 },
    body: { type: String, label: "Body", max: 500 },
    userId: { type: String },
    ficId: { type: String },
  })
);
