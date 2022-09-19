import { Meteor } from "meteor/meteor";
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { useTranslator } from "/imports/ui/i18n";
import { FicsCollection } from "/imports/collections";

export default function FicsIndex() {
  const fics = useTracker(() => {
    const handler = Meteor.subscribe("fics");

    if (!handler.ready()) return [];

    return FicsCollection.find({}).fetch();
  });

  const t = useTranslator();

  return (
    <div>
      <h2>{t("fics.title")}</h2>
      {fics.map((f) => (
        <div key={f._id}>
          <div>{f.title}</div>
          <div>{f.description}</div>
          <div>User ID:{f.userId}</div>
        </div>
      ))}
    </div>
  );
}
