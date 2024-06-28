import { Button, Form, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import axios, { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

import filterProfanityWords from '../../dictionary';
import routes from '../../routes';
import { addMessage } from '../../store/slices/messagesSlice';

const ChatMessagesForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { currentChannelId } = useSelector((state) => state.channels);
  const { messages } = useSelector((state) => state.messages);
  const { userInfo: { username, token } } = useSelector((state) => state.user);

  const inputRef = useRef();

  const [formState, setFormState] = useState({});

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId, messages]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      setFormState({});
      try {
        const preparedData = {
          body: filterProfanityWords(values.body),
          channelId: currentChannelId,
          username,
        };
        const { status, data } = await axios.post(routes.messagesApiPath(), preparedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (status === 200) {
          dispatch(addMessage(data));
          resetForm();
        }
      } catch (error) {
        setSubmitting(false);
        if (isAxiosError(error)) {
          toast.error(t('errors.formErrors.networkError'));
          return;
        }
        toast.error(t('errors.formErrors.unknownError'));
      }
    },
  });

  return (
    <>
      {formState.isError && <Alert variant="danger">{formState.errorMessage}</Alert>}
      <Form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2" id="message-form">
        <Form.Group controlId="message" className="input-group has-validation">
          <Form.Control
            ref={inputRef}
            className="border-0 p-0 ps-2"
            name="body"
            aria-label={t('form.messages.newMessage')}
            placeholder={t('form.messages.enterMessage')}
            value={formik.values.body}
            disabled={formik.isSubmitting}
            onChange={formik.handleChange}
          />
          <Button disabled={!formik.values.body || formik.isSubmitting} type="submit" variant="group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span className="visually-hidden">{t('form.sendBtn')}</span>
          </Button>
        </Form.Group>
      </Form>
    </>

  );
};

export default ChatMessagesForm;
