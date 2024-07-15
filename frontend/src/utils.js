import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

const handleFetchErrors = (error, t) => {
  if (isAxiosError(error?.data)) {
    toast.error(t('errors.formErrors.networkError'));
    return;
  }
  toast.error(t('errors.formErrors.unknownError'));
};

export default handleFetchErrors;
