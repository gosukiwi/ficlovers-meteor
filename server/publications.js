import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import {
  FicsCollection,
  ChaptersCollection,
  TagsCollection,
} from "/imports/collections";

Meteor.publish("user.fics.byId", function (id) {
  check(id, String);

  return FicsCollection.find({ _id: id, userId: this.userId });
});

Meteor.publish("user.fics", function () {
  return FicsCollection.find({ userId: this.userId });
});

Meteor.publish("fics.byId", function (_id) {
  check(_id, String);

  return FicsCollection.find({
    _id,
    $or: [{ status: "published" }, { userId: this.userId }],
  });
});

Meteor.publish(
  "fics.search",
  function ({ keyword, tags, crossover, nsfw, language }) {
    check(keyword, String);
    check(tags, Array);
    check(crossover, Boolean);
    check(nsfw, Boolean);
    check(language, String);

    if (keyword === "" && tags.length === 0) return [];

    const query = {
      status: "published",
      crossover,
      nsfw,
    };

    if (keyword !== "") {
      query.$text = { $search: keyword };
    }

    if (tags.length > 0) {
      query.tags = { $all: tags };
    }

    if (language !== "") {
      query.language = language;
    }

    return FicsCollection.find(query);
  }
);

Meteor.publish("user.chapters.byFicId", function (ficId) {
  check(ficId, String);

  const fic = FicsCollection.findOne({ _id: ficId, userId: this.userId });
  if (!fic) return this.ready(); // empty if fic is not the author

  return ChaptersCollection.find({ ficId });
});

Meteor.publish("chapters.byId", function (ficId) {
  check(ficId, String);

  const fic = FicsCollection.findOne({
    _id: ficId,
    $or: [{ status: "published" }, { userId: this.userId }],
  });
  if (!fic) return this.ready(); // empty if fic is not published

  return ChaptersCollection.find({ ficId });
});

Meteor.publish("users.byId", function (_id) {
  check(_id, String);

  return Meteor.users.find(_id);
});

Meteor.publish("tags.byName", function (name) {
  check(name, String);

  return TagsCollection.find(
    {
      name: { $regex: new RegExp(`^${name}`), $options: "i" },
    },
    { limit: 5 }
  );
});
