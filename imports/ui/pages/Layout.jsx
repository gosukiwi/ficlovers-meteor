import { Meteor } from "meteor/meteor";
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Link, Outlet } from "react-router-dom";
import { useTranslator } from "/imports/ui/i18n";

export default function Layout() {
  const user = useTracker(() => Meteor.user());
  const t = useTranslator();
  const username = user ? user.username : "Anon";

  return (
    <div>
      <span>{t("users.logged_in_as", { username })}</span>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/fics">Fics</Link>
          </li>
          <li>
            <Link to="/write">Write</Link>
          </li>
          <li>
            {user ? (
              <Link onClick={() => Meteor.logout()}>Logout</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}
