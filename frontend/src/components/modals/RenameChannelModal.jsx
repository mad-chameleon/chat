import {
  Button,
  Form,
  FormControl,
  FormGroup,
  Modal,
} from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setLocale } from 'yup';
import * as Yup from 'yup';
import axios, { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import { useModal } from '../../hooks';
import routes from '../../routes';
import { renameChannel } from '../../store/slices/channelsSlice';

const RenameChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channelId, hideModal } = useModal();

  const inputRef = useRef();

  const channels = useSelector((state) => state.channels.channelsData);
  const { userInfo: { token } } = useSelector((state) => state.user);

  const channelNames = channels.map(({ name }) => name);
  const { name } = channels.find(({ id }) => Number(id) === Number(channelId));

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
      try {
        const preparedData = { name: values.name.trim() };
        const { status, data } = await axios.patch(
          routes.editChannelApiPath(channelId),
          preparedData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (status === 200) {
          resetForm();
          dispatch(renameChannel(data));
          hideModal();
          toast.success(t('toasts.channelRenamed'));
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
            <Form.Label className="visually-hidden" htmlFor="name" />
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
