import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useModal } from '../../hooks';
// eslint-disable-next-line import/named

import handleFetchErrors from '../../utils';
import usePrevious from '../../hooks/usePrevious';
import { useFetchDeleteMessageMutation } from '../../services/messagesApi';

const DeleteMessage = () => {
  const { t } = useTranslation();
  const { currentId, hideModal } = useModal();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fetchDeleteMessage] = useFetchDeleteMessageMutation();

  const { messages } = useSelector((state) => state.messages);
  const prevMessagessLength = usePrevious(messages.length);

  useEffect(() => {
    if (prevMessagessLength !== undefined && messages.length < prevMessagessLength) {
      hideModal();
    }
  }, [messages.length, prevMessagessLength]);

  const onHandleDeleteMessage = async () => {
    setIsSubmitting(true);

    const { error } = await fetchDeleteMessage({ id: currentId });
    if (error) {
      handleFetchErrors(error, t);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <p>{t('questions.confirmMessageDeletion')}</p>
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
          onClick={onHandleDeleteMessage}
          disabled={isSubmitting}
        >
          {t('form.deleteBtn')}
        </Button>
      </div>
    </>

  );
};

export default DeleteMessage;
