import filter from 'leo-profanity';

const filterProfanityWords = (message) => {
  if (/[а-яА-Я]+/.test(message)) {
    filter.loadDictionary('ru');
    return filter.clean(message, '*', 1);
  }
  filter.loadDictionary('en');
  return filter.clean(message, '*', 1);
};

export default filterProfanityWords;
