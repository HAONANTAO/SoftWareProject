import React from "react";
import { Outlet } from "react-router-dom";

function Coach() {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
}

export default Coach;
