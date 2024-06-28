import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import App from './components/App';
import { AuthProvider, ModalProvider } from './providers/index';
import resources from './locales/index.js';
import store from './store/index.js';

const setupRollbar = () => {
  const rollbarConfig = {
    accessToken: '453d3bc2ce8a4c9daa292108d3beb1a2',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'testenv',
    },
  };

  return rollbarConfig;
};

const setupI18n = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return i18n;
};

const AppInitializer = ({ rollbarConfig, i18n }) => (
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

const init = async () => {
  const rollbarConfig = setupRollbar();
  const i18n = await setupI18n();

  return <AppInitializer rollbarConfig={rollbarConfig} i18n={i18n} />;
};

export default init;
