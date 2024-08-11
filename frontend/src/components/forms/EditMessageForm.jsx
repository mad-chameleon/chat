import {
  Button,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import { useModal } from '../../hooks';
import filterProfanityWords from '../../dictionary';
import handleFetchErrors from '../../utils';
import usePrevious from '../../hooks/usePrevious';
import { useFetchEditMessageMutation } from '../../services/messagesApi';

const EditMessageForm = () => {
  const { t } = useTranslation();

  const { currentId, hideModal } = useModal();

  const inputRef = useRef();

  const { messages } = useSelector((state) => state.messages);
  const { body } = messages.find(({ id }) => id === currentId);
  const [fetchEditMessage] = useFetchEditMessageMutation();

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: { body },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      const editedMessage = { body: filterProfanityWords(values.body) };

      const { error } = await fetchEditMessage({ id: currentId, editedMessage });
      if (error) {
        handleFetchErrors(error, t);
        return;
      }
      resetForm();
    },
  });

  const prevMessageBody = usePrevious(body);

  useEffect(() => {
    if (prevMessageBody !== undefined && body !== prevMessageBody) {
      hideModal();
    }
  }, [body, prevMessageBody]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <FormControl
          className="mb-2"
          ref={inputRef}
          required
          id="body"
          name="body"
          value={formik.values.body}
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
        />
        <Form.Label className="visually-hidden" htmlFor="body">{t('chat.channelName')}</Form.Label>
        <div className="d-flex justify-content-end">
          <Button
            type="button"
            variant="secondary"
            className="me-2"
            onClick={() => hideModal()}
            disabled={formik.isSubmitting}
          >
            {t('form.cancelBtn')}
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={formik.isSubmitting}
          >
            {t('chat.editMessageBtn')}
          </Button>
        </div>
      </FormGroup>
    </Form>
  );
};

export default EditMessageForm;
