import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import App from './components/App';
import { AuthProvider } from './providers/index';
import resources from './locales/index.js';
// import store from './store/index.js';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <BrowserRouter>
          { /* <Provider store={store}> */ }
          <App />
          {/* </Provider> */}
        </BrowserRouter>
      </AuthProvider>
    </I18nextProvider>
  );
};

export default init;
