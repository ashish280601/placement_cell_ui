import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSignUp } from "../../slice/authSlice";
import { Link, useNavigate } from "react-router-dom";
import loginimg from "../../assets/imges/loginimg.png";
import { toast } from "react-toastify";
function SignUp() {
  const [SignUp, setSignUp] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e) {
    // write your code here
    const { name, value } = e.target;
    setSignUp((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await dispatch(createSignUp(SignUp));
      console.log("signUp res data", res);

      if (res.payload.data.status === true) {
        setSignUp({});
        navigate("/login");
        return;
      } else if (res.payload.data.status === false) {
        setSignUp({});
        return;
      }
    } catch (err) {
      console.error("Error during sign up:", err);
      toast.error(err.message,{
        position: "bottom-right",
        autoClose: 3000
      })
      addNotification({
        title: "Error",
        message: "Something went wrong",
        native: true,
      });
    }
  }

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
              <form action="post" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="input_box">
                      {" "}
                      <div className="form-group">
                        <label> Name </label>
                        <input
                          type="text"
                          name="name"
                          value={SignUp?.name || ""}
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
                        <label> Email </label>
                        <input
                          type="email"
                          name="email"
                          value={SignUp?.email || ""}
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
                          value={SignUp?.password || ""}
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
                        SignUp
                      </button>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="input_box" id="submit_btn">
                      <p>
                        Already have an account
                        <Link to="/login" onClick={() => setSignUp({})}>
                          {" "}
                          login
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

export default SignUp;
