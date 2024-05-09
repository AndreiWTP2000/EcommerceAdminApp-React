import { NavLink } from "react-router-dom";
import {
  EcommerceSvg,
  DashboardSvg,
  ProductsSvg,
  OrdersSvg,
} from "../../img/svg";
function AdminNav() {
  return (
    <div className="nav-top">
      <ul className="nav">
        <li className="nav-item container">
          <NavLink
            className={({ isActive }) =>
              isActive ? " nav-link active-link" : "nav-link"
            }
            to="/"
          >
            <div className="row">
              <div className="col-sm-1  col-md-2 align-self-end">
                {" "}
                {EcommerceSvg}
              </div>
              <div className="col-sm-11 col-md-10 align-self-end">
                {" "}
                E-Shop Admin
              </div>
            </div>
          </NavLink>
        </li>
        <li className="nav-item container">
          <NavLink
            className={({ isActive }) =>
              isActive ? " nav-link active-link" : "nav-link"
            }
            to="/dashboard"
          >
            <div className="row">
              <div className="col-sm-1  col-md-2 align-self-end">
                {" "}
                {DashboardSvg}
              </div>
              <div className="col-sm-11 col-md-10 align-self-end">
                {" "}
                Dashboard
              </div>
            </div>
          </NavLink>
        </li>
        <li className="nav-item container">
          <NavLink
            className={({ isActive }) =>
              isActive ? " nav-link active-link" : "nav-link"
            }
            to="/products"
          >
            <div className="row">
              <div className="col-sm-1  col-md-2 align-self-end">
                {" "}
                {ProductsSvg}
              </div>
              <div className="col-sm-11 col-md-10 align-self-end">
                {" "}
                Products
              </div>
            </div>
          </NavLink>
        </li>
        <li className="nav-item container">
          <NavLink
            className={({ isActive }) =>
              isActive ? " nav-link active-link" : "nav-link"
            }
            to="/orders"
          >
            <div className="row">
              <div className="col-sm-1  col-md-2 align-self-end">
                {" "}
                {OrdersSvg}
              </div>
              <div className="col-sm-11 col-md-10 align-self-end"> Orders</div>
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminNav;
