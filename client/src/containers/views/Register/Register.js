import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { config } from "../../../config/config.js";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { Spinner } from "../../../components/index.js";
import "./Register.css";

export const Register = ({ history }) => {
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const makeRegisterRequest = ({
    name,
    surname,
    email,
    password,
    signUpCode,
    setSubmitting,
  }) => {
    setIsLoading(true);
    const requestOptions = {
      method: "POST",
    };

    fetch(
      config.userRegister +
        `?password=${password}&email=${email}&firstname=${name}&lastname=${surname}&code=${signUpCode}`,
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res) {
          if (res.code === "success") {
            setTimeout(() => {
              setIsLoading(false);
              setSuccess(true);
              setErr("");
              setTimeout(() => {
                history.push("/login");
              }, 1500);
            }, 1000);
          }
          if (res.code === "SignUp code is invalid") {
            setTimeout(() => {
              setIsLoading(false);
              setSuccess(false);
              setErr("Sign up code is wrong!");
              setTimeout(() => {
                setErr("");
              }, 2000);
            }, 1000);
          }
          if (res.code === "This email has already been registered") {
            setTimeout(() => {
              setIsLoading(false);
              setSuccess(false);
              setErr("This email has already been registered");
              setTimeout(() => {
                setErr("");
              }, 2000);
            }, 1000);
          }
        }
      });
  };

  return isLoading ? (
    <div className='spinner-container'>
      <Spinner />
    </div>
  ) : success ? (
    <div className='success-msg msg'>Success! Redirecting to Login</div>
  ) : (
    <div className='form-container register'>
      <h1 className='new-ad-title'>Register</h1>
      <Formik
        initialValues={{
          name: "",
          surname: "",
          email: "",
          password: "",
          signUpCode: "",
        }}
        validate={({ name, surname, email, password, signUpCode }) => {
          const errors = {};
          if (!name) errors.name = "Required";
          if (!surname) errors.surname = "Required";
          if (!password) errors.password = "Required";
          if (!email) {
            errors.email = "Required";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            errors.email = "Invalid email address";
          }
          if (!signUpCode) {
            errors.signUpCode = "Required";
          }
          // else if (signUpCode !== "we_sell_houses_agent") {
          //   errors.signUpCode = "Wrong sign up code";
          // }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          makeRegisterRequest(values, setSubmitting);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Field
              component={TextField}
              name='name'
              type='text'
              label='Name'
              className={"add-input"}
            />
            <br />
            <Field
              component={TextField}
              name='surname'
              type='text'
              label='Surname'
              className={"add-input"}
            />
            <br />
            <Field
              component={TextField}
              name='email'
              type='email'
              label='Email'
              className={"add-input"}
            />
            <br />
            <Field
              component={TextField}
              name='password'
              type='password'
              label='Password'
              className={"add-input"}
            />
            <br />
            <Field
              component={TextField}
              name='signUpCode'
              type='password'
              label='Sign Up Code'
              className={"add-input"}
            />
            <span className='err-msg'>{err}</span>
            <br />
            <Button
              variant='contained'
              color='primary'
              disabled={isSubmitting}
              onClick={submitForm}
              className={"add-input add-btn"}
            >
              Register
            </Button>
            <Link to='/login' className='silent-text'>
              <span>Already registered? Click to login</span>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};
