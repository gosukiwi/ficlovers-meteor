import { Meteor } from "meteor/meteor";
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  const user = useTracker(() => Meteor.user());

  return (
    <div>
      <span>Logged in as {user ? user.username : "Anon"}</span>
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
