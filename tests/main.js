import { expect } from "chai";
import "./imports/fics-statuses.test.js";

describe("ficlovers-meteor", function () {
  if (Meteor.isClient) {
    it("client is not server", function () {
      expect(Meteor.isServer).to.eq(false);
    });
  }

  if (Meteor.isServer) {
    it("server is not client", function () {
      expect(Meteor.isClient).to.eq(false);
    });
  }
});
