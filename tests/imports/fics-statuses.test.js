import { Meteor } from "meteor/meteor";
import { expect } from "chai";
import { FicsCollection } from "/imports/collections";

if (Meteor.isServer) {
  describe("Fics have statuses", function () {
    beforeEach(function () {
      FicsCollection.remove({});
    });

    it("has wip status by default", function () {
      const id = FicsCollection.insert({
        title: "Test Task",
        description: new Date(),
        userId: 1,
      });

      const fic = FicsCollection.findOne(id);
      expect(fic.status).to.eq("wip");
    });

    it("complains on invalid status", function () {
      expect(() =>
        FicsCollection.insert({
          title: "Test Task",
          description: new Date(),
          userId: 1,
          status: "potato",
        })
      ).to.throw(/must be in/);
    });
  });
}
