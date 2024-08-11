import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { useModal } from '../../hooks';
// eslint-disable-next-line import/named
import { useFetchDeleteChannelMutation } from '../../services/channelsApi';
import handleFetchErrors from '../../utils';
import usePrevious from '../../hooks/usePrevious';

const DeleteChannel = () => {
  const { t } = useTranslation();
  const { currentId, hideModal } = useModal();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fetchDeleteChannel] = useFetchDeleteChannelMutation();
  const channels = useSelector((state) => state.channels.channelsData);

  const onHandleDeleteChannel = async () => {
    setIsSubmitting(true);

    const { error } = await fetchDeleteChannel({ channelId: currentId });
    if (error) {
      handleFetchErrors(error, t);
      setIsSubmitting(false);
    }
  };

  const prevChannelsLength = usePrevious(channels.length);

  useEffect(() => {
    if (prevChannelsLength !== undefined && channels.length < prevChannelsLength) {
      hideModal();
      toast.success(t('toasts.channelDeleted'));
    }
  }, [channels.length, prevChannelsLength]);

  return (
    <>
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
    </>

  );
};

export default DeleteChannel;
