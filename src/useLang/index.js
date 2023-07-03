const useLang = ({ defaultLang = 'en' } = {}) => {
  if (typeof navigator === 'object') {
    return (navigator.language || navigator.userLanguage || defaultLang).slice(0, 2);
  }

  return defaultLang;
};

export default useLang;
