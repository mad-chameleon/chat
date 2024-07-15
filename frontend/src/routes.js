const apiPath = '/api/v1';
export default {
  chatPagePath: () => '/',
  loginPagePath: () => '/login',
  signupPagePath: () => '/signup',
  otherPagePath: () => '*',

  baseApiPath: () => apiPath,

  signInApiPath: () => [apiPath, 'login'].join('/'),
  signUpApiPath: () => [apiPath, 'signup'].join('/'),
  channelsApiPath: () => ['/channels'].join('/'),
  editChannelApiPath: (id) => ['/channels', `${id}`].join('/'),
  messagesApiPath: () => ['/messages'].join('/'),

  newMessagePath: () => 'newMessage',
  newChannelPath: () => 'newChannel',
  renameChannelPath: () => 'renameChannel',
  removeChannelPath: () => 'removeChannel',
};
