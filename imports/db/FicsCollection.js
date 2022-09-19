import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const FicsCollection = new Mongo.Collection("fics");
FicsCollection.attachSchema(
  new SimpleSchema({
    title: { type: String, label: "Title", max: 50 },
    description: { type: String, label: "Description", max: 500 },
    userId: { type: String },
  })
);

export default FicsCollection;
