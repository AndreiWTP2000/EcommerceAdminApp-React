import { Link } from "react-router-dom";

const NotFound = ({ authToken }) => {
  return (
    <div className=" not-found">
      {authToken && <h1 className="text-white">404</h1>}
      <h1 className="text-white">
        {authToken ? "PAGE NOT FOUND" : "ACCES DENIED"}
      </h1>
      <Link to="/">
        <button className="btn btn-light btn-lg">
          {authToken ? "Back Home" : "Back to Log in"}
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
