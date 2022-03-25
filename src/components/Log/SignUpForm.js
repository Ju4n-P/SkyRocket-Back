import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const myStyle = { backgroundImage: "url('./img/passwordpic.jpg')" };
  const [errors, setErrors] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();
    let hasError = false;
    setErrors({});

    if (password !== controlPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordConfirm: "les mots de passe ne correspondent pas",
      }));
      hasError = true;
    }

    if (!e.target.terms.checked) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          terms: "veuillez valider les conditions génrales",
        };
      });
      hasError = true;
    }

    if (hasError) {
      return;
    }
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/register`,
      data: {
        pseudo,
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
              pseudo: res.data.errors.pseudo,
              email: res.data.errors.email,
              password: res.data.errors.password,
            };
          });
        } else {
          setFormSubmit(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <div class="row justify-content-center">
          <div class="col-md-7 col-lg-5">
            <div class="wrap">
              <div class="img" style={myStyle}></div>
              <div class="login-wrap p-4 p-md-5">
                <div class="d-flex">
                  <div class="w-100 ">
                    <h3 class="mb-4 ">Enregistrement</h3>
                  </div>
                </div>
                <form action="" onSubmit={handleRegister} class="signin-form">
                  <div class="form-group mt-3">
                    <input
                      type="text"
                      class="form-control"
                      required
                      onChange={(e) => setPseudo(e.target.value)}
                      value={pseudo}
                    />
                    <div className="pseudo error"></div>

                    <label class="form-control-placeholder" for="text">
                      Pseudo
                    </label>
                  </div>
                  <div class="form-group mt-3">
                    <input
                      type="email"
                      class="form-control"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <label class="form-control-placeholder" for="email">
                      Exemple@email.com
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
                      Mot de passe
                    </label>
                    <span
                      toggle="#password-field"
                      class="fa fa-fw fa-eye field-icon toggle-password"
                    ></span>
                  </div>

                  <div class="form-group">
                    <input
                      id="password-conf"
                      type="password"
                      class="form-control"
                      required
                      onChange={(e) => setControlPassword(e.target.value)}
                      value={controlPassword}
                    />
                    <label class="form-control-placeholder" for="password-conf">
                      Confirmation Mot de passe
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
                      Enregistrement
                    </button>
                  </div>
                  <div class="form-group d-md-flex">
                    <div class="w-50 text-left">
                      <label
                        class="checkbox-wrap checkbox-primary mb-0"
                        For="terms"
                      >
                        <div className="terms error"></div>
                        Réglement ok?
                        <input type="checkbox" id="terms" name="terms" />
                        <span class="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </form>
                <p>{JSON.stringify(errors, undefined, 2)}</p>
                <p class="text-center">
                  Déjà membre?{" "}
                  <a data-toggle="tab" href="#signin">
                    connexion
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpForm;
