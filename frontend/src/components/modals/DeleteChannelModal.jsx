import {
  Button,
  Modal,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useModal } from '../../hooks';
// eslint-disable-next-line import/named
import { useFetchDeleteChannelMutation } from '../../services/channelsApi';
import handleFetchErrors from '../../utils';

const DeleteChannelModal = () => {
  const { t } = useTranslation();
  const { channelId, hideModal } = useModal();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fetchDeleteChannel] = useFetchDeleteChannelMutation({
    onError: (error) => {
      handleFetchErrors(error, t);
    },
  });

  const onHandleDeleteChannel = async () => {
    setIsSubmitting(true);

    const { error } = await fetchDeleteChannel({ channelId });
    if (error) {
      handleFetchErrors(error, t);
      return;
    }
    setIsSubmitting(false);
    hideModal();
    toast.success(t('toasts.channelDeleted'));
  };

  return (
    <Modal centered show onHide={() => hideModal()}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.deleteChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{t('questions.confirmChannelDeletion')}</p>
        <div className="d-flex justify-content-end">
          <Button
            type="button"
            variant="secondary"
            className="me-2"
            onClick={() => hideModal()}
            disabled={isSubmitting}
          >
            {t('form.cancelBtn')}
          </Button>
          <Button
            type="submit"
            variant="danger"
            onClick={onHandleDeleteChannel}
            disabled={isSubmitting}
          >
            {t('form.deleteBtn')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteChannelModal;
