import {
  Fragment, useEffect, useRef, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './MessagesList.module.css';

import ChatMessagesForm from '../forms/ChatMessagesForm.jsx';
import MessagesContextMenu from './MessagesContextMenu';

const getMessageWidthClass = (body = '') => {
  if (body.length < 40) return styles.w25;
  if (body.length < 60) return styles.w50;
  return styles.w75;
};

const MessagesList = () => {
  const { t } = useTranslation();
  const messagesBoxRef = useRef();

  const channels = useSelector((state) => state.channels.channelsData);
  const { messages } = useSelector((state) => state.messages);
  const { currentChannelId } = useSelector((state) => state.channels);

  const currentChannelMessages = messages.filter((msg) => msg.channelId === currentChannelId);
  const currentChannel = channels.find(({ id }) => id === currentChannelId);
  const messagesCount = currentChannelMessages.length;

  const { userInfo } = useSelector((state) => state.user);

  const [contextMenu, setContextMenu] = useState({
    visible: false, x: 0, y: 0, id: null,
  });

  const messageRef = useRef(null);

  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  }, [messages, currentChannelId]);

  const handleContextMenu = (id) => (event) => {
    event.preventDefault();
    const { clientX, clientY } = event;
    const menuHeight = 150.75;
    const menuWidth = 170.9375;

    const x = (clientX + menuWidth > window.innerWidth) ? (window.innerWidth - menuWidth) : clientX;
    // eslint-disable-next-line max-len
    const y = (clientY + menuHeight > window.innerHeight) ? (window.innerHeight - menuHeight) : clientY;
    setContextMenu({
      visible: true, x, y, id,
    });
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {channels.length > 0 && currentChannel && currentChannel.name && `# ${currentChannel.name}`}
          </b>
        </p>
        <span className="text-muted">{t('form.messages.messagesCount.count', { count: messagesCount })}</span>
      </div>
      <div ref={messagesBoxRef} id="messages-box" className="overflow-auto px-5 d-flex flex-column">
        {/* eslint-disable-next-line max-len */}
        {currentChannelMessages.map(({
          body, id, username,
        }) => (
          <Fragment key={id}>
            <div
              ref={messageRef}
              onContextMenu={(e) => {
                if (userInfo.username === username) {
                  handleContextMenu(id)(e);
                }
              }}
              className={`text-break mb-2 d-flex flex-column ${getMessageWidthClass(body)} bg-light rounded-4 shadow-sm border-0 ps-3 pe-3 pt-1 pb-0 ${userInfo.username === username && 'align-self-end bg-body-secondary'}`}
            >
              <strong className="text-dark fw-semibold">{`${username}:`}</strong>
              <p className="text-dark mb-1">{body}</p>
            </div>
            {contextMenu.visible && (
            <MessagesContextMenu
              setContextMenu={setContextMenu}
              contextMenu={contextMenu}
            />
            )}
          </Fragment>
        )) }
      </div>
      <div className="mt-auto px-5 py-3 position-relative z-0">
        <ChatMessagesForm />
      </div>
    </div>
  );
};

export default MessagesList;
