import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../slice/authSlice";
import loginimg from "../../assets/imges/loginimg.png";
import { toast } from "react-toastify";

function SignIn() {
  const [login, setLogin] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    // write your code here
    e.preventDefault();
    try {
      const res = await dispatch(loginUser(login));
      console.log("login response component", res);
      if (res?.payload?.data?.data?.status === true) {
        setLogin({});
        navigate("/student");
        return;
      } else {
        setLogin({});
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message,{
        position: "bottom-right",
        autoClose: 3000,
      })
    }
  };

  return (
    <>
      <section className="SignUp_sec">
        <div className="container">
          <div className="row">
            <div className="col-md-6 right_col">
              <div className="img_box">
                <img src={loginimg} alt="de" />
              </div>
            </div>
            <div className="col-md-6 left_col">
              <form action="post" onSubmit={handleLoginSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="input_box">
                      {" "}
                      <div className="form-group">
                        <label> Email </label>
                        <input
                          type="email"
                          name="email"
                          value={login?.email || ""}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="input_box">
                      {" "}
                      <div className="form-group">
                        <label> Password </label>
                        <input
                          type="password"
                          name="password"
                          value={login?.password || ""}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="input_box">
                      <button
                        className="btn btn-outline-success "
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="input_box" id="submit_btn">
                      <p>
                        Create an account
                        <Link to="/signup" onClick={() => SignIn({})}>
                          {" "}
                          signUp
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignIn;
