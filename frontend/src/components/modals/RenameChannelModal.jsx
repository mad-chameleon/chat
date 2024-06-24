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
import axios from 'axios';

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
      .notOneOf(channelNames),
  });

  const formik = useFormik({
    initialValues: { name },
    validationSchema: renameChannelSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.patch(
          routes.editChannelApiPath(channelId),
          { name: values.name },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        dispatch(renameChannel(data));
        formik.resetForm();
        hideModal();
      } catch (error) {
        console.log('Failed to rename a channel', error);
      }
    },
  });
  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal show onHide={() => hideModal()}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.renameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              className="mb-2"
              ref={inputRef}
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.errors.name && formik.touched.name}
            />
            <Form.Label className="visually-hidden" htmlFor="name" />
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                type="button"
                variant="secondary"
                className="me-2"
                onClick={() => hideModal()}
              >
                {t('form.cancelBtn')}
              </Button>
              <Button type="submit" variant="primary">{t('chat.renameChannelBtn')}</Button>
            </div>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
