import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useAuth } from '../../hooks';
import routes from '../../routes';

const LoginForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();

  const inputRef = useRef();

  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      setAuthFailed(false);
      try {
        const { data: { token } } = await axios.post(routes.signInApiPath(), values);
        auth.logIn(token);
        navigate(routes.chatPagePath());
      } catch (error) {
        setSubmitting(false);
        if (error instanceof AxiosError && error.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw (error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">{t('form.signIn')}</h1>
      <FloatingLabel label={t('form.fields.nickname')} className="mb-3" controlId="username">
        <Form.Control
          ref={inputRef}
          type="text"
          name="username"
          autoComplete="username"
          placeholder={t('form.fields.nickname')}
          required
          value={formik.values.username}
          onChange={formik.handleChange}
          isInvalid={authFailed}
        />
      </FloatingLabel>
      <FloatingLabel label={t('form.fields.password')} className="mb-4" controlId="password">
        <Form.Control
          type="password"
          name="password"
          placeholder={t('form.fields.password')}
          required
          onChange={formik.handleChange}
          isInvalid={authFailed}
        />
        <Form.Control.Feedback type="invalid" tooltip>{t('errors.loginFailed')}</Form.Control.Feedback>
      </FloatingLabel>
      <Button variant="outline-primary" type="submit" className="w-100 mb-3">
        {t('form.signInBtn')}
      </Button>
    </Form>
  );
};

export default LoginForm;
