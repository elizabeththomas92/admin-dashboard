import React from "react";
import AllUsers from "../../components/AllUsers";
import NavBar from "../../components/layout/NavBar";
import SideBar from "../../components/layout/SideBar";

function Users() {
  return (
    <>
      <NavBar />
      <div className="flex bg-slate-200">
        <SideBar />
        <AllUsers />
      </div>
    </>
  );
}

export default Users;
