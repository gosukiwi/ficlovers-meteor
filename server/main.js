import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import "/imports/methods";
import { FicsCollection, ChaptersCollection } from "/imports/collections";
import "./publications";

Meteor.startup(() => {
  const USERNAME = process.env.FICLOVERS_SEED_USER_USERNAME;
  const PASSWORD = process.env.FICLOVERS_SEED_USER_PASSWORD;

  if (!Accounts.findUserByUsername(USERNAME)) {
    Accounts.createUser({ username: USERNAME, password: PASSWORD });
  }

  // Create indeces
  FicsCollection.createIndex({ userId: 1 });
  ChaptersCollection.createIndex(
    { ficId: 1 },
    { userId: 1 },
    { order: 1 },
    { status: 1 }
  );
  // For when search is implemented
  // See: https://www.mongodb.com/docs/manual/core/index-text/
  // See: https://www.mongodb.com/docs/manual/reference/operator/query/text/#examples
  // FicsCollection.createIndex(
  //   { title: "text", description: "text" }
  // );
  // ChaptersCollection.createIndex({ body: 'text' });

  // If the Links collection is empty, add some data.
  // if (LinksCollection.find().count() === 0) {
  //   insertLink({
  //     title: "Do the Tutorial",
  //     url: "https://www.meteor.com/tutorials/react/creating-an-app",
  //   });
  //   insertLink({
  //     title: "Follow the Guide",
  //     url: "http://guide.meteor.com",
  //   });
  //   insertLink({
  //     title: "Read the Docs",
  //     url: "https://docs.meteor.com",
  //   });
  //   insertLink({
  //     title: "Discussions",
  //     url: "https://forums.meteor.com",
  //   });
  // }
});
