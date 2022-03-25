import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSetAtom } from "jotai";
import { isLoggedAtom } from "../../stores/user";
import { useDispatch } from "react-redux";
import { getUser } from "../../actions/user.actions";
import "./auth.scss";

const SignInForm = () => {
  const setIsLogged = useSetAtom(isLoggedAtom);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myStyle = { backgroundImage: "url('./img/passwordpic.jpg')" };
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    let hasError = false;
    setErrors({});
    // const emailError = document.querySelector(".email.error");
    // const passwordError = document.querySelector(".password.error");
    

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          setErrors((prevErrors) => {
            return {
              ...prevErrors,
              email: res.data.errors.email,
              password: res.data.errors.password,
            };
          });
          //remove utiliser 2 state
          // emailError.innerHTML = res.data.errors.email;
          // passwordError.innerHTML = res.data.errors.password;
          return;
        }
        setIsLogged(true);
        Cookies.set("jwt", res.data.jwt);
        dispatch(getUser(res.data.user));
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div class="row justify-content-center">
      <div class="col-md-7 col-lg-5">
        <div class="wrap">
          <div class="img" style={myStyle}></div>
          <div class="login-wrap p-4 p-md-5">
            <div class="d-flex">
              <div class="w-100 ">
                <h3 class="mb-4 ">Sign In</h3>
              </div>
            </div>
            <form action="" onSubmit={handleLogin} class="signin-form">
              <div class="form-group mt-3">
                <input
                  type="email"
                  class="form-control"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <label class="form-control-placeholder" for="email">
                  email
                </label>
              </div>
              <div class="form-group">
                <input
                  id="password-field"
                  type="password"
                  class="form-control"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <label class="form-control-placeholder" for="password">
                  Password
                </label>
                <span
                  toggle="#password-field"
                  class="fa fa-fw fa-eye field-icon toggle-password"
                ></span>
              </div>
              <div class="form-group">
                <button
                  type="submit"
                  class="form-control btn btn-primary rounded submit px-3"
                >
                  Sign In
                </button>
              </div>
              <div class="form-group d-md-flex">
                <div class="w-50 text-left">
                  <label class="checkbox-wrap checkbox-primary mb-0">
                    Remember Me
                    <input type="checkbox" checked />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
            </form>
            <p class="text-center">
              Not a member?{" "}
              <a data-toggle="tab" href="#signup">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
