import * as Yup from 'yup';

const useChannelSchema = (channelNames) => Yup.object().shape({
  name: Yup
    .string()
    .required()
    .min(3)
    .max(20)
    .transform((channelName) => channelName.trim())
    .notOneOf(channelNames),
});

export default useChannelSchema;
