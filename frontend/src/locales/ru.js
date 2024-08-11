export default {
  translation: {
    nav: {
      main: 'Перейти на главную страницу',
    },
    toasts: {
      channelCreated: 'Канал создан',
      channelDeleted: 'Канал удалён',
      channelRenamed: 'Канал переименован',
    },
    questions: {
      confirmChannelDeletion: 'Уверены?',
      confirmMessageDeletion: 'Уверены?',
    },
    chat: {
      channels: 'Каналы',
      channelName: 'Имя канала',
      addChannel: 'Добавить канал',
      deleteChannel: 'Удалить канал',
      deleteMessage: 'Удалить сообщение',
      editMessage: 'Редактировать сообщение',
      renameChannel: 'Переименовать канал',
      channelControl: 'Управление каналом',
      addChannelBtn: '+',
      deleteChannelBtn: 'Удалить',
      renameChannelBtn: 'Переименовать',
      editMessageBtn: 'Редактировать',
      switchChannelBtn: '#',
      logoutBtn: 'Выйти',
    },
    form: {
      signIn: 'Вход',
      signInBtn: 'Войти',
      signUp: 'Регистрация',
      signUpBtn: 'Зарегистрироваться',
      sendBtn: 'Отправить',
      cancelBtn: 'Отменить',
      deleteBtn: 'Удалить',
      fields: {
        nickname: 'Ваш ник',
        username: 'Имя пользователя',
        password: 'Пароль',
        passwordConfirmation: 'Подтвердите пароль',
      },
      messages: {
        newMessage: 'Новое сообщение',
        enterMessage: 'Введите сообщение...',
        messagesCount: {
          count_one: '{{count}} сообщение',
          count_few: '{{count}} сообщения',
          count_many: '{{count}} сообщений',
        },
      },
    },
    msgContextMenu: {
      edit: 'Редактировать',
      delete: 'Удалить',
      copy: 'Скопировать',
    },
    errors: {
      reload: 'Перезагрузите страницу.',
      routeErrors: {
        404: 'ОШИБКА 404',
        notFound: 'Cтраница не найдена',
      },
      formErrors: {
        networkError: 'Ошибка соединения',
        unknownError: 'Неизвестная ошибка',
      },
      modalErrors: {
        notOneOf: 'Должно быть уникальным',
        required: 'Введите имя канала',
        min: 'От 3 до 20 символов',
        max: 'От 3 до 20 символов',
      },
      registrationErrors: {
        min: 'От 3 до 20 символов',
        max: 'От 3 до 20 символов',
        oneOf: 'Пароли должны совпадать',
        userExists: 'Такой пользователь уже существует',
        password: {
          min: 'Не менее 6 символов',
        },
      },
      required: 'Обязательное поле',
      loginFailed: 'Неверные имя пользователя или пароль',
    },
    footer: {
      noAccount: 'Нет аккаунта? ',
    },
  },
};
