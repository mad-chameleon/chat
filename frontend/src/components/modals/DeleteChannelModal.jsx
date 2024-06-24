import {
  Button,
  Modal,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { useModal } from '../../hooks';
import routes from '../../routes';
import { removeChannel } from '../../store/slices/channelsSlice';

const DeleteChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channelId, hideModal } = useModal();

  const { userInfo: { token } } = useSelector((state) => state.user);

  const onHandleDeleteChannel = async () => {
    try {
      const { data } = await axios.delete(routes.editChannelApiPath(channelId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(removeChannel(data));
      hideModal();
    } catch (error) {
      console.log('Failed to delete a channel', error);
    }
  };

  return (
    <Modal show onHide={() => hideModal()}>
      <Modal.Header className="modal-header-theme" closeVariant="white" closeButton>
        <Modal.Title>{t('chat.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-theme">
        <p className="lead">{t('questions.confirmChannelDeletion')}</p>
        <div className="d-flex justify-content-end">
          <Button
            type="button"
            variant="secondary"
            className="me-2"
            onClick={() => hideModal()}
          >
            {t('form.cancelBtn')}
          </Button>
          <Button
            type="submit"
            variant="danger"
            onClick={onHandleDeleteChannel}
          >
            {t('form.deleteBtn')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteChannelModal;
