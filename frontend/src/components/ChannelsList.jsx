import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toggleChannel } from '../store/slices/channelsSlice';
import { useModal } from '../hooks';

const ChannelsList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { showModal } = useModal();

  const channelRefs = useRef({});

  const channels = useSelector((state) => state.channels.channelsData);
  const { currentChannelId } = useSelector((state) => state.channels);

  const onToggleChannel = (id) => () => dispatch(toggleChannel({ currentChannelId: Number(id) }));

  useEffect(() => {
    const activeChannelRef = channelRefs.current[currentChannelId];
    if (activeChannelRef) {
      activeChannelRef.scrollIntoView();
    }
  }, [channels]);

  return (
    <ul
      id="channels-box"
      className="scroll-area nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {channels.length > 0 && channels.map(({ name, id, removable }) => {
        const variant = currentChannelId === Number(id) ? 'secondary' : null;
        if (removable) {
          return (
            <li
              key={id}
              className="nav-item w-100"
              ref={(el) => { channelRefs.current[id] = el; }}
            >
              <Dropdown as={ButtonGroup} className="d-flex">
                <Button
                  variant={variant}
                  type="button"
                  className="w-100 rounded-0 text-start text-truncate"
                  onClick={onToggleChannel(id)}
                >
                  <span className="me-1">{t('chat.switchChannelBtn')}</span>
                  {name}
                </Button>
                <Dropdown.Toggle
                  variant={variant}
                  type="button"
                  className="flex-grow-0"
                >
                  <span className="visually-hidden">Управление каналом</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => showModal('delete', Number(id))}>
                    {t('chat.deleteChannelBtn')}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => showModal('rename', Number(id))}>
                    {t('chat.renameChannelBtn')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          );
        }

        return (
          <li key={id} className="nav-item w-100">
            <Button
              variant={variant}
              type="button"
              className="w-100 text-start rounded-0"
              onClick={onToggleChannel(id)}
            >
              <span className="me-1">{t('chat.switchChannelBtn')}</span>
              {name}
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default ChannelsList;
