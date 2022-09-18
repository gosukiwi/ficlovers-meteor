import { Meteor } from "meteor/meteor";
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import FicsCollection from "/imports/db/FicsCollection";

export default function FicsIndex() {
  const fics = useTracker(() => {
    const handler = Meteor.subscribe("fics");

    if (!handler.ready()) return [];

    return FicsCollection.find({}).fetch();
  });

  return (
    <div>
      <h2>Fics</h2>
      {fics.map((f) => (
        <div key={f._id}>
          <div>{f.title}</div>
          <div>{f.description}</div>
        </div>
      ))}
    </div>
  );
}
