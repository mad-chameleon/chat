import ModalWindow from './ModalWindow';
import AddChannelForm from './forms/AddChannelForm';
import RenameChannelForm from './forms/RenameChannelForm';
import DeleteChannel from './channels/DeleteChannel';
import DeleteMessage from './messages/DeleteMessage';
import EditMessageForm from './forms/EditMessageForm';

const modals = {
  add: (
    <ModalWindow title="chat.addChannel">
      <AddChannelForm />
    </ModalWindow>
  ),
  rename: (
    <ModalWindow title="chat.renameChannel">
      <RenameChannelForm />
    </ModalWindow>
  ),
  deleteChannel: (
    <ModalWindow title="chat.deleteChannel">
      <DeleteChannel />
    </ModalWindow>
  ),
  deleteMessage: (
    <ModalWindow title="chat.deleteMessage">
      <DeleteMessage />
    </ModalWindow>
  ),
  editMessage: (
    <ModalWindow title="chat.editMessage">
      <EditMessageForm />
    </ModalWindow>
  ),
};

export default modals;
