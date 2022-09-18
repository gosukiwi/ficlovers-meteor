import { Mongo } from "meteor/mongo";

const FicsCollection = new Mongo.Collection("fics");

export default FicsCollection;
