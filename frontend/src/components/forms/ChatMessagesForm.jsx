import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import filterProfanityWords from '../../dictionary';
import { useFetchMessageMutation } from '../../services/messagesApi';
import { setMessagesStatus } from '../../store/slices/messagesSlice';
import handleFetchErrors from '../../utils';

const ChatMessagesForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { currentChannelId } = useSelector((state) => state.channels);
  const { status } = useSelector((state) => state.messages);
  const { userInfo: { username } } = useSelector((state) => state.user);

  const inputRef = useRef();

  const [fetchMessage, { data: message }] = useFetchMessageMutation();

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      dispatch(setMessagesStatus(''));
      const preparedData = {
        body: filterProfanityWords(values.body),
        channelId: currentChannelId,
        username,
      };
      const { error } = await fetchMessage(preparedData);
      if (error) {
        handleFetchErrors(error, t);
      }
    },
  });

  useEffect(() => {
    if (status === 'loaded') {
      formik.resetForm();
    }
  }, [status]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentChannelId, message]);

  return (
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
  );
};

export default ChatMessagesForm;
