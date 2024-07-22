import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { setLocale } from 'yup';

import App from './components/App';
import { AuthProvider, ModalProvider } from './providers/index';
import resources from './locales/index.js';
import store from './store/index.js';
import { createSocketApi } from './socket';

const init = async () => {
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: process.env.NODE_ENV || 'development',
    },
  };

  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  setLocale({
    mixed: {
      notOneOf: () => i18n.t('errors.modalErrors.notOneOf'),
      required: () => i18n.t('errors.modalErrors.required'),
    },
    string: {
      min: () => i18n.t('errors.modalErrors.min'),
      max: () => i18n.t('errors.modalErrors.max'),
    },
  });

  const { setupSockets } = createSocketApi(store.dispatch);
  setupSockets();

  return (
    <RollbarProvider config={rollbarConfig}>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <AuthProvider>
            <ModalProvider>
              <BrowserRouter>
                <ErrorBoundary>
                  <App />
                </ErrorBoundary>
              </BrowserRouter>
            </ModalProvider>
          </AuthProvider>
        </Provider>
      </I18nextProvider>
    </RollbarProvider>
  );
};
export default init;
