import { Outlet } from "react-router-dom";
import AdminNav from "./AdminNav";

function Admin() {
  return (
    <div className="container-fluid admin-container ">
      <div className="row">
        <nav className="col-md-4 col-lg-3 d-md-block bg-white sidebar design nav-top">
          <AdminNav />
        </nav>

        <main className="col-md-8 ms-sm-auto col-lg-9 px-md-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Admin;
