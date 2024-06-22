import { Button, ListGroup } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const ChannelsList = () => {
  const { t } = useTranslation();

  const channels = useSelector((state) => state.channels.channelsData);
  const { currentChannelId } = useSelector((state) => state.channels);

  return (
    <ul id="channels-box" className="scroll-area nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map(({ name, id, removable }) => {
        const variant = currentChannelId === Number(id) ? 'secondary' : null;

        // if (removable) {
        //   return (
        //     <ListGroup.Item key={id} className="nav-item w-100">
        //       <Dropdown
        //         role="group"
        //       >
        //         <Button
        //           variant={variant}
        //           type="button"
        //           className="switch-channel-button w-100 rounded-0 text-start text-truncate"
        //         >
        //           <span className="me-1">{t('chat.switchChannelBtn')}</span>
        //           {name}
        //         </Button>
        //         <Dropdown.Toggle
        //           variant={variant}
        //           type="button"
        //           id={`dropdown-toggle-${id}`}
        //           className="channel-dropdown-button flex-grow-0 dropdown-toggle dropdown-toggle-split"
        //         >
        //           <span className="visually-hidden">Управление каналом</span>
        //         </Dropdown.Toggle>
        //         <Dropdown.Menu
        //           aria-labelledby={`dropdown-toggle-${id}`}
        //           style={{
        //             position: 'absolute',
        //             inset: '0px auto auto 0px',
        //             top: '39.403px',
        //             left: '5.01493px',
        //           }}
        //           x-placement="bottom-start"
        //           className="channel-dropdown"
        //         >
        //           <Dropdown.Item className="channel-dropdown-item" onClick={() => modal.showModal('delete', id)}>
        //             {t('chat.deleteChannelBtn')}
        //           </Dropdown.Item>
        //           <Dropdown.Item className="channel-dropdown-item" onClick={() => modal.showModal('rename', id)}>
        //             {t('chat.renameChannelBtn')}
        //           </Dropdown.Item>
        //         </Dropdown.Menu>
        //       </Dropdown>
        //     </ListGroup.Item>
        //   );
        // }

        return (
          <ListGroup.Item key={id} className="nav-item w-100">
            <Button
              variant={variant}
              type="button"
              className="w-100 text-start rounded-0"
            >
              <span className="me-1">{t('chat.switchChannelBtn')}</span>
              {name}
            </Button>
          </ListGroup.Item>
        );
      })}
    </ul>
  );
};

export default ChannelsList;
