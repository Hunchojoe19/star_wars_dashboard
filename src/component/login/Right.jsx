import React, { useEffect, useRef, useState } from "react";
import InputField from "../reusables/input/InputField";
import Button from "../reusables/button/Button";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6}$/;
const Right = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const userRef = useRef();
  const navigate = useNavigate();

  const [validMail, setValidMail] = useState(false);
  const [mailFocus, setMailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    setValidMail(emailRegex.test(formValues.email));
  }, [formValues.email]);
  useEffect(() => {
    setValidPassword(passwordRegex.test(formValues.password));
  }, [formValues.password]);

  useEffect(() => {
    setValid(validMail && validPassword);
  }, [validMail, validPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [formValues.email, formValues.password]);
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(formValues.email));
    navigate("/dashboard");
  };
  return (
    <div className="w-full h-screen">
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col items-center justify-center md:border md:border-primary-gray/30 w-[467px] h-[564px] rounded-lg">
          <div className="flex flex-col gap-y-12 justify-center w-[335px] h-[510px]">
            <div className="flex flex-col gap-y-2">
              <p className="text-2xl text-primary-details_color font-semibold">
                Login
              </p>
              <p className="text-base text-primary-light_grey font-normal">
                Kindly enter your details to log in{" "}
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <InputField
                label="Email Address"
                type="email"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    email: e.target.value,
                  })
                }
                error={!validMail && mailFocus}
                helperText={!validMail && mailFocus && "Invalid email address"}
                name="email"
                handleBlur={() => setMailFocus(false)}
                handleFocus={() => setMailFocus(true)}
                ref={userRef}
              />
              <InputField
                label="Password"
                type="password"
                value={formValues.password}
                onChange={(e) => {
                  setFormValues({ ...formValues, password: e.target.value });
                  setValidPassword(passwordRegex.test(e.target.value));
                }}
                error={!validPassword && passwordFocus}
                helperText={
                  !validPassword &&
                  passwordFocus &&
                  "Password should be exactly 6 characters long and contain both letters and numbers"
                }
                name="password"
                handleBlur={() => setPasswordFocus(false)}
                handleFocus={() => setPasswordFocus(true)}
                ref={userRef}
              />
            </form>
            <div className="-mt-4">
              <Button onClick={handleSubmit} valid={valid} />
              {errMsg && (
                <p className="text-red-500 text-sm font-normal">{errMsg}</p>
              )}
            </div>

            <div className="flex justify-center items-center -mt-4">
              <p className="text-sm text-primary-forgot_password font-normal cursor-pointer">
                Forgot password?
              </p>
            </div>
            <div className="mt-8 flex gap-x-1 justify-center items-center">
              <p className="underline capitalize text-sm font-normal">
                privacy policy
              </p>
              <span className="text-primary-terms_color text-sm font-normal">
                and
              </span>
              <p className="underline text-sm font-normal">Terms of services</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Right;
