import React from "react";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <div className="">
      <div className="text-3xl p-4">
        <h1>Sidebar</h1>
        <h1>Header</h1>
      </div>
      <hr />
      <Outlet />
    </div>
  );
};

export default LayoutAdmin;
