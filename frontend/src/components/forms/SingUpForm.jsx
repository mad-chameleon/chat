import {
  Button,
  FloatingLabel,
  Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setLocale } from 'yup';
import * as Yup from 'yup';
import axios, { isAxiosError } from 'axios';

import { useAuth } from '../../hooks/index';
import routes from '../../routes.js';

const SignUpForm = () => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const [formState, setFormState] = useState({});

  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  setLocale({
    mixed: {
      oneOf: () => t('errors.registrationErrors.oneOf'),
      required: () => t('errors.required'),
    },
    string: {
      min: () => t('errors.registrationErrors.min'),
      max: () => t('errors.registrationErrors.max'),
    },
  });

  const signUpFormSchema = Yup.object().shape({
    username: Yup.string().required().min(3).max(20),
    password: Yup.string().required().min(6, t('errors.registrationErrors.password.min')),
    passwordConfirmation: Yup.string().required(t('errors.registrationErrors.oneOf')).oneOf([Yup.ref('password')]),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: signUpFormSchema,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      setFormState({});
      try {
        const { username, password } = values;
        const { data } = await axios.post(routes.signUpApiPath(), { username, password });
        auth.logIn(data);
        navigate(routes.chatPagePath());
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
        if (isAxiosError(error)) {
          if (error.response.status === 409) {
            setFormState({
              isError: true,
              errorMessage: t('errors.registrationErrors.userExists'),
            });
            inputRef.current.select();
            return;
          }
          setFormState({ isError: true, errorMessage: t('errors.formErrors.networkError') });
          return;
        }
        setFormState({ isError: true, errorMessage: t('errors.formErrors.unknownError') });
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="w-50">
      <h1 className="text-center mb-4 fs-2">{t('form.signUp')}</h1>
      <FloatingLabel label={t('form.fields.username')} className="mb-3" controlId="username">
        <Form.Control
          ref={inputRef}
          type="text"
          name="username"
          autoComplete="username"
          placeholder={t('form.fields.username')}
          required
          value={formik.values.username}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
          isInvalid={(formik.errors.username && formik.touched.username) || formState.isError}
        />
        <Form.Control.Feedback tooltip type="invalid">{formik.errors.username}</Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel label={t('form.fields.password')} className="mb-3" controlId="password">
        <Form.Control
          type="password"
          name="password"
          placeholder={t('form.fields.password')}
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          isInvalid={(formik.errors.password && formik.touched.password) || formState.isError}
        />
        <Form.Control.Feedback tooltip type="invalid">{formik.errors.password}</Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel label={t('form.fields.passwordConfirmation')} className="mb-3" controlId="passwordConfirmation">
        <Form.Control
          type="password"
          name="passwordConfirmation"
          autoComplete="passwordConfirmation"
          placeholder={t('form.fields.passwordConfirmation')}
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          isInvalid={
            (
              formik.errors.passwordConfirmation
              && formik.touched.passwordConfirmation
              && formik.values.password !== formik.values.passwordConfirmation
            ) || formState.isError
          }
        />
        <Form.Control.Feedback tooltip type="invalid">
          {formState.isError ? formState.errorMessage : formik.errors.passwordConfirmation}
        </Form.Control.Feedback>
      </FloatingLabel>
      <Button
        variant="outline-primary"
        type="submit"
        className="mt-2 w-100"
        disabled={formik.isSubmitting}
      >
        {t('form.signUpBtn')}
      </Button>
    </Form>
  );
};

export default SignUpForm;
