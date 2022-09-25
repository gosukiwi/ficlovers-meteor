import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

function inEnum(...values) {
  return function () {
    if (!values.includes(this.value)) {
      return `${this.value} must be in ${values.join(", ")}`;
    }
  };
}

export const FicsCollection = new Mongo.Collection("fics");
FicsCollection.attachSchema(
  new SimpleSchema({
    title: { type: String, label: "Title", max: 50 },
    description: { type: String, label: "Description", max: 500 },
    userId: { type: String },
    status: {
      type: String,
      custom: inEnum("wip", "published", "finished"),
      defaultValue: "wip",
    },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  })
);

export const ChaptersCollection = new Mongo.Collection("chapters");
ChaptersCollection.attachSchema(
  new SimpleSchema({
    title: { type: String, label: "Title", max: 50 },
    body: { type: String, label: "Body", max: 50000, optional: true },
    userId: { type: String },
    ficId: { type: String },
    order: { type: Number, defaultValue: 0 },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  })
);

export const TagsCollection = new Mongo.Collection("tags");
ChaptersCollection.attachSchema(
  new SimpleSchema({
    name: { type: String, label: "Name", max: 15 },
    count: { type: Number, defaultValue: 0 },
  })
);
