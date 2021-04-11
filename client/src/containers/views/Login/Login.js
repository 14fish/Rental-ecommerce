import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { config } from '../../../config/config.js';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Spinner } from '../../../components/index.js';
import { setAuthToken, isAuth } from '../../../_helpers/isAuth.js';
import './Login.css';

export const Login = ({ history }) => {
  if (isAuth()) history.push('/profile');

  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const makeLoginRequest = ({ email, password }) => {
    setIsLoading(true);

    const requestOptions = {
      method: 'POST',
    };

    fetch(
      config.userLogin + `?email=${email}&password=${password}`,
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.token) {
          setAuthToken('we_sell_houses_auth', res.token, 1500000);
        }
        if (res.code === 'success') {
          setTimeout(() => {
            setIsLoading(false);
            setErr('');
            history.push('/profile');
            window.location.reload();
          }, 1000);
        } else {
          setTimeout(() => {
            setIsLoading(false);
            setErr('Something is wrong, try again!');
            setTimeout(() => {
              setErr('');
            }, 2000);
          }, 1000);
        }
      });
  };

  return isLoading ? (
    <div className='spinner-container'>
      <Spinner />
    </div>
  ) : (
    <div className='form-container login'>
      <h1 className='new-ad-title'>Login</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validate={({ email, password }) => {
          const errors = {};
          if (!password) {
            errors.password = 'Required';
          }
          if (!email) {
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          makeLoginRequest(values);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Field
              component={TextField}
              name='email'
              type='email'
              label='Email'
              className={'add-input'}
            />
            <br />
            <Field
              component={TextField}
              name='password'
              type='password'
              label='Password'
              className={'add-input'}
            />
            <br />
            <span className='err-msg'>{err}</span>
            <Button
              variant='contained'
              color='primary'
              disabled={isSubmitting}
              onClick={submitForm}
              className={'add-input add-btn'}
            >
              Login
            </Button>
            <Link to='/register' className='silent-text'>
              <span>Haven't registered?</span>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};
