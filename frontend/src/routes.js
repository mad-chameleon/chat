const apiPath = '/api/v1';
export default {
  chatPagePath: () => '/',
  loginPagePath: () => '/login',
  signupPagePath: () => '/signup',
  otherPagePath: () => '*',

  signInApiPath: () => [apiPath, 'login'].join('/'),
  signUpApiPath: () => [apiPath, 'signup'].join('/'),
  channelsApiPath: () => [apiPath, 'channels'].join('/'),
  messagesApiPath: () => [apiPath, 'messages'].join('/'),
};
