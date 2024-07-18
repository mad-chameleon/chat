import ModalWindow from './ModalWindow';
import AddChannelForm from './forms/AddChannelForm';
import RenameChannelForm from './forms/RenameChannelForm';
import DeleteChannel from './DeleteChannel';

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
  delete: (
    <ModalWindow title="chat.deleteChannel">
      <DeleteChannel />
    </ModalWindow>
  ),
};

export default modals;
