const apiPath = '/api/v1';
export default {
  chatPagePath: () => '/',
  loginPagePath: () => '/login',
  signupPagePath: () => '/signup',
  otherPagePath: () => '*',

  signInApiPath: () => [apiPath, 'login'].join('/'),
  signUpApiPath: () => [apiPath, 'signup'].join('/'),
  dataApiPath: () => [apiPath, 'data'].join('/'),

  newMessagePath: () => 'newMessage',
  newChannelPath: () => 'newChannel',
  renameChannelPath: () => 'renameChannel',
  removeChannelPath: () => 'removeChannel',
};
