import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import ChatMessagesForm from './forms/ChatMessagesForm.jsx';

const MessagesList = () => {
  const { t } = useTranslation();
  const messagesBoxRef = useRef();

  const channels = useSelector((state) => state.channels.channelsData);
  const { messages } = useSelector((state) => state.messages);
  const { currentChannelId } = useSelector((state) => state.channels);

  const currentChannelMessages = messages.filter((msg) => msg.channelId === currentChannelId);
  const currentChannel = channels.find(({ id }) => Number(id) === currentChannelId);

  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  }, [messages, currentChannelId]);

  const messagesCount = currentChannelMessages.length;

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {channels.length > 0 && currentChannel.name && `# ${currentChannel.name}`}
          </b>
        </p>
        <span className="text-muted">{t('form.messages.messagesCount.count', { count: messagesCount })}</span>
      </div>
      <div ref={messagesBoxRef} id="messages-box" className="overflow-auto px-5">
        {currentChannelMessages.map(({ body, id, username }) => (
          <div key={id} className="text-break mb-2">
            <b>{username}</b>
            {': '}
            {body}
          </div>
        )) }
      </div>
      <div className="mt-auto px-5 py-3">
        <ChatMessagesForm />
      </div>
    </div>
  );
};

export default MessagesList;
