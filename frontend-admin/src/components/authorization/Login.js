import { useState } from "react";
import { useCookies } from "react-cookie";
import AdminIcon from "../../img/admin.png";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data);

    if (!data.detail) {
      setCookie("AuthToken", data.token);
      window.location.reload();
    } else {
      setError(data.detail);
    }
  };
  return (
    <div className="login-container">
      <div className="login ">
        <div className="d-flex align-items-center mx-5 ">
          <img src={AdminIcon} alt="" className="py-3 " />
          <h1 className="py-3  ">Log in to your account</h1>
        </div>
        <form className="form-control" onSubmit={handleSubmit}>
          <div className="form-group py-3 mx-5">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control text-white bg-black"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="current-email"
            />
          </div>
          <div className="form-group py-3 mx-5">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control text-white bg-black"
              id="exampleInputPassword1"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            {error && <p className="text-danger mt-3">{error}</p>}
          </div>

          <div className="text-center ">
            <button
              type="submit"
              className="btn btn-dark btn-lg  my-4 mx-5 bwidth"
              onClick={(e) => handleSubmit}
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
