import {
  Button, Container, Col, Row, Spinner,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setChannelsData } from '../store/slices/channelsSlice';
import { setMessages } from '../store/slices/messagesSlice';
import ChannelsList from '../components/ChannelsList';
import MessagesList from '../components/MessagesList';
import { useModal } from '../hooks';
import { useFetchChannelsQuery } from '../services/channelsApi';
import { useFetchMessagesQuery } from '../services/messagesApi';
import handleFetchErrors from '../utils';

const ChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { showModal } = useModal();

  const {
    data: channelsData = [],
    isLoading: isLoadingChannels,
    error: channelsError,
  } = useFetchChannelsQuery();

  const {
    data: messagesData = [],
    isLoading: isLoadingMessages,
    error: messagesError,
  } = useFetchMessagesQuery();

  useEffect(() => {
    if (channelsError || messagesError) {
      console.error('Fetching initial data failed');
      handleFetchErrors(channelsError, t);
    }
  }, [channelsError, messagesError]);

  useEffect(() => {
    if (!isLoadingChannels && !isLoadingMessages) {
      dispatch(setChannelsData(channelsData));
      dispatch(setMessages(messagesData));
    }
  }, [
    dispatch,
    channelsData,
    messagesData,
    isLoadingChannels,
    isLoadingMessages,
  ]);

  return (
    <>
      {isLoadingChannels && isLoadingMessages && (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {!isLoadingChannels && !isLoadingMessages && (
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
          <Row className="h-100 bg-white flex-md-row">
            <div className="d-flex bg-light col-4 col-md-2 border-end px-0 flex-column h-100">
              <div className="mt-1 d-flex justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>{t('chat.channels')}</b>
                <Button
                  variant="group-vertical"
                  className="text-primary p-0"
                  onClick={() => showModal('add')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                    <path d="M 14 1 a 1 1 0 0 1 1 1 v 12 a 1 1 0 0 1 -1 1 H 2 a 1 1 0 0 1 -1 -1 V 2 a 1 1 0 0 1 1 -1 h 12 Z M 2 0 a 2 2 0 0 0 -2 2 v 12 a 2 2 0 0 0 2 2 h 12 a 2 2 0 0 0 2 -2 V 2 a 2 2 0 0 0 -2 -2 H 2 Z" />
                    <path d="M 8 4 a 0.5 0.5 0 0 1 0.5 0.5 v 3 h 3 a 0.5 0.5 0 0 1 0 1 h -3 v 3 a 0.5 0.5 0 0 1 -1 0 v -3 h -3 a 0.5 0.5 0 0 1 0 -1 h 3 v -3 A 0.5 0.5 0 0 1 8 4 Z" />
                  </svg>
                  <span className="visually-hidden">{t('chat.addChannelBtn')}</span>
                </Button>
              </div>
              <ChannelsList />
            </div>
            <Col className="p-0 h-100">
              <MessagesList />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ChatPage;
