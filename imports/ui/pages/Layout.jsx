import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
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
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}
