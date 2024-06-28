import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios, { isAxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks';
import routes from '../../routes';

const LoginForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();

  const inputRef = useRef();
  const [formState, setFormState] = useState({});

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      setFormState({});
      try {
        const { data } = await axios.post(routes.signInApiPath(), values);
        auth.logIn(data);
        navigate(routes.chatPagePath());
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
        if (isAxiosError(error)) {
          if (error.response.status === 401) {
            setFormState({ isError: true, errorMessage: t('errors.loginFailed') });
            inputRef.current.select();
            return;
          }
          toast.error(t('errors.formErrors.networkError'));
          return;
        }
        toast.error(t('errors.formErrors.unknownError'));
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
          isInvalid={formState.isError}
          disabled={formik.isSubmitting}
        />
      </FloatingLabel>
      <FloatingLabel label={t('form.fields.password')} className="mb-4" controlId="password">
        <Form.Control
          type="password"
          name="password"
          placeholder={t('form.fields.password')}
          required
          onChange={formik.handleChange}
          isInvalid={formState.isError}
          disabled={formik.isSubmitting}
        />
        <Form.Control.Feedback type="invalid" tooltip>{formState.errorMessage}</Form.Control.Feedback>
      </FloatingLabel>
      <Button
        variant="outline-primary"
        type="submit"
        className="w-100 mb-3"
        disabled={formik.isSubmitting}
      >
        {t('form.signInBtn')}
      </Button>
    </Form>
  );
};

export default LoginForm;
