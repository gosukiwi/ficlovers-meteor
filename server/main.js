import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import "/imports/methods/fics";
import "/imports/publications/fics";

Meteor.startup(() => {
  const USERNAME = process.env.FICLOVERS_SEED_USER_USERNAME;
  const PASSWORD = process.env.FICLOVERS_SEED_USER_PASSWORD;

  if (!Accounts.findUserByUsername(USERNAME)) {
    Accounts.createUser({ username: USERNAME, password: PASSWORD });
  }

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
