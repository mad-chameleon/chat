import {
  Button,
  Form,
  FormControl,
  FormGroup,
  Modal,
} from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setLocale } from 'yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';

import { useModal } from '../../hooks';
import filterProfanityWords from '../../dictionary';
import { useFetchRenameChannelMutation } from '../../services/channelsApi';
import handleFetchErrors from '../../utils';

const RenameChannelModal = () => {
  const { t } = useTranslation();

  const { channelId, hideModal } = useModal();

  const inputRef = useRef();

  const channels = useSelector((state) => state.channels.channelsData);

  const channelNames = channels.map(({ name }) => name);
  const { name } = channels.find(({ id }) => Number(id) === Number(channelId));

  const [fetchRenameChannel] = useFetchRenameChannelMutation({
    onError: (error) => {
      handleFetchErrors(error, t);
    },
  });

  useEffect(() => {
    inputRef.current.select();
  }, []);

  setLocale({
    mixed: {
      notOneOf: () => t('errors.modalErrors.notOneOf'),
      required: () => t('errors.modalErrors.required'),
    },
    string: {
      min: () => t('errors.modalErrors.min'),
      max: () => t('errors.modalErrors.max'),
    },
  });

  const renameChannelSchema = Yup.object().shape({
    name: Yup
      .string()
      .required()
      .min(3)
      .max(20)
      .transform((channelName) => channelName.trim())
      .notOneOf(channelNames),
  });

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
      hideModal();
      toast.success(t('toasts.channelRenamed'));
    },
  });

  return (
    <Modal centered show onHide={() => hideModal()}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.renameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
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
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
