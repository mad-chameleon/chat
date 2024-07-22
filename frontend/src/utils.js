import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

export const setChannelSchema = (channelNames) => Yup.object().shape({
  name: Yup
    .string()
    .required()
    .min(3)
    .max(20)
    .transform((channelName) => channelName.trim())
    .notOneOf(channelNames),
});

const handleFetchErrors = (error, t) => {
  if (isAxiosError(error?.data)) {
    toast.error(t('errors.formErrors.networkError'));
    return;
  }
  toast.error(t('errors.formErrors.unknownError'));
};

export default handleFetchErrors;
