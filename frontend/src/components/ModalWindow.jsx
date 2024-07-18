import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useModal } from '../hooks';

const ModalWindow = ({ title, children }) => {
  const { hideModal } = useModal();
  const { t } = useTranslation();

  return (
    <Modal centered show onHide={() => hideModal()}>
      <Modal.Header closeButton>
        <Modal.Title>{t(title)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default ModalWindow;
