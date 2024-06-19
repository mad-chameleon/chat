import { Form, Button, FloatingLabel } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';
import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';

const LoginForm = () => {
  const { t } = useTranslation();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
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
        />
      </FloatingLabel>
      <FloatingLabel label={t('form.fields.password')} className="mb-4" controlId="password">
        <Form.Control
          type="password"
          name="password"
          placeholder={t('form.fields.password')}
          required
          onChange={formik.handleChange}
        />
        <Form.Control.Feedback type="invalid">{t('errors.loginFailed')}</Form.Control.Feedback>
      </FloatingLabel>
      <Button variant="outline-primary" type="submit" className="w-100 mb-3">
        {t('form.signInBtn')}
      </Button>
    </Form>
  );
};

export default LoginForm;
