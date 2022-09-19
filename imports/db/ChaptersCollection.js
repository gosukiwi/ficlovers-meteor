import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const ChaptersCollection = new Mongo.Collection("chapters");
ChaptersCollection.attachSchema(
  new SimpleSchema({
    title: { type: String, label: "Title", max: 50 },
    body: { type: String, label: "Body", max: 500 },
    userId: { type: String },
    ficId: { type: String },
  })
);

export default ChaptersCollection;
