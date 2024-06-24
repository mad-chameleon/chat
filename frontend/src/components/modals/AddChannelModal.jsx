import {
  Modal,
  FormGroup,
  FormControl,
  Button,
  Form,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setLocale } from 'yup';
import * as Yup from 'yup';
import axios from 'axios';

import { useModal } from '../../hooks/index';
import routes from '../../routes';
import { addChannel } from '../../store/slices/channelsSlice';

const AddChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { hideModal } = useModal();

  const channels = useSelector((state) => state.channels.channelsData);
  const { userInfo: { token } } = useSelector((state) => state.user);

  const channelNames = channels.map(({ name }) => name);

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

  const addChannelSchema = Yup.object().shape({
    name: Yup
      .string()
      .required()
      .min(3)
      .max(20)
      .notOneOf(channelNames),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: addChannelSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(routes.channelsApiPath(), { name: values.name }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(addChannel(data));
        formik.resetForm();
        hideModal();
      } catch (error) {
        console.log('Failed to add new channel');
      }
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal centered show onHide={() => hideModal()}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.addChannel')}</Modal.Title>
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
            />
            <Form.Label className="visually-hidden" htmlFor="name">{t('chat.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end mt-4">
              <Button
                type="button"
                variant="secondary"
                className="me-2"
                onClick={() => hideModal()}
              >
                {t('form.cancelBtn')}
              </Button>
              <Button type="submit" variant="primary">{t('form.sendBtn')}</Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
