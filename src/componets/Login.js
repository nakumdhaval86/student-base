import React, { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

function Login() {
  const firebase = useFirebase();
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const userForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.login(user);
    history.push("/");
  };

  return (
    <>
      <div className="login_bg">
        <div className="container">
          <div className="py-5">
            <div className="row mt-5">
              <div className="col-md-4 offset-md-4">
                <div className="card shadow">
                  <div className="card-body">
                    <h2 className="brand_name text-center mb-4">
                      STUDENT BASE
                    </h2>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter Your E-mail"
                          value={user.name}
                          onChange={userForm}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Enter Your Password"
                          value={user.password}
                          onChange={userForm}
                        />
                      </div>
                      <button className="btn btn-primary btn-block">
                        Login to dashboard
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
