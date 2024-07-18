import {
  Button,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';

import { useModal } from '../../hooks';
import filterProfanityWords from '../../dictionary';
import { useFetchRenameChannelMutation } from '../../services/channelsApi';
import handleFetchErrors from '../../utils';
import usePrevious from '../../hooks/usePrevious';
import useChannelSchema from '../../hooks/useChannelSchema';

const RenameChannelModal = () => {
  const { t } = useTranslation();

  const { channelId, hideModal } = useModal();

  const inputRef = useRef();

  const channels = useSelector((state) => state.channels.channelsData);

  const channelNames = channels.map(({ name }) => name);
  const { name } = channels.find(({ id }) => Number(id) === Number(channelId));

  const [fetchRenameChannel] = useFetchRenameChannelMutation();

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const renameChannelSchema = useChannelSchema(channelNames);

  const formik = useFormik({
    initialValues: { name },
    validationSchema: renameChannelSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      const preparedData = { name: filterProfanityWords(values.name.trim()), channelId };

      const { error } = await fetchRenameChannel(preparedData);
      if (error) {
        handleFetchErrors(error, t);
        return;
      }
      resetForm();
    },
  });

  const prevChannelName = usePrevious(name);

  useEffect(() => {
    if (prevChannelName !== undefined && name !== prevChannelName) {
      hideModal();
      toast.success(t('toasts.channelRenamed'));
    }
  }, [name, prevChannelName]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <FormControl
          className="mb-2"
          ref={inputRef}
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          isInvalid={formik.errors.name && formik.touched.name}
          disabled={formik.isSubmitting}
        />
        <Form.Label className="visually-hidden" htmlFor="name">{t('chat.channelName')}</Form.Label>
        <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
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
            {t('chat.renameChannelBtn')}
          </Button>
        </div>
      </FormGroup>
    </Form>
  );
};

export default RenameChannelModal;
