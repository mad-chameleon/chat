import { Button } from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useModal } from '../../hooks';

const menuItems = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil align-self-center" viewBox="0 0 16 16">
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
      </svg>
    ),
    text: 'msgContextMenu.edit',
    action: 'edit',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-copy align-self-center"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
        />
      </svg>
    ),
    text: 'msgContextMenu.copy',
    action: 'copy',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-trash align-self-center"
        viewBox="0 0 16 16"
      >
        <path
          d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
        />
        <path
          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
        />
      </svg>
    ),
    text: 'msgContextMenu.delete',
    action: 'delete',
  },
];

const copyTextToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Text copied to clipboard');
  }).catch((err) => {
    console.error('Failed to copy text: ', err);
  });
};

const MessagesContextMenu = ({ setContextMenu, contextMenu }) => {
  const { t } = useTranslation();
  const contextMenuRef = useRef(null);

  const { messages } = useSelector((state) => state.messages);
  const { showModal } = useModal();

  const handleClickOutside = (event) => {
    if (contextMenuRef.current) {
      const rect = contextMenuRef.current.getBoundingClientRect();
      const { clientX: x, clientY: y } = event;

      if (
        x < rect.left
        || x > rect.right
        || y < rect.top
        || y > rect.bottom
      ) {
        setContextMenu({
          visible: false,
          x: 0,
          y: 0,
          id: null,
        });
      }
    }
  };

  const onClickHandler = (action) => () => {
    const { id } = contextMenu;
    const { body = '' } = messages.find((msg) => msg.id === id) || {};

    const resetContextMenu = () => {
      setContextMenu({
        visible: false,
        x: 0,
        y: 0,
        id: null,
      });
    };

    const actionsMap = {
      copy: () => {
        copyTextToClipboard(body);
        resetContextMenu();
      },
      delete: () => {
        showModal('deleteMessage', id);
        resetContextMenu();
      },
      edit: () => {
        showModal('editMessage', id);
        resetContextMenu();
      },
    };

    actionsMap[action]();
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contextMenu]);

  return (
    <div
      ref={contextMenuRef}
      className="position-absolute bg-light rounded-1 border border-secondary-subtle align-self-end pt-1 pb-1 z-1"
      style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
    >
      {menuItems.map(({ icon, text, action }) => (
        <Button
          onClick={onClickHandler(action)}
          key={text}
          type="button"
          className="d-flex gap-2 border-0 p-2 w-100"
          variant="light"
        >
          {icon}
          <small>{t(text)}</small>
        </Button>
      ))}
    </div>
  );
};

export default MessagesContextMenu;
