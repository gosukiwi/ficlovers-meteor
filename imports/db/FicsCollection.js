import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import i18n from "meteor/universe:i18n";

function getErrorMessage(error, label) {
  if (error.type === "required") return i18n.__("foo.bar");

  // Returning undefined will fall back to using defaults
  return undefined;
}

const FicsCollection = new Mongo.Collection("fics");
FicsCollection.attachSchema(
  new SimpleSchema(
    {
      title: { type: String, label: "Title", max: 50 },
      description: { type: String, label: "Description", max: 500 },
      userId: { type: String },
    },
    { getErrorMessage }
  )
);

export default FicsCollection;
