import { useEffect } from 'react';

const useOnScroll = (callback, el = window) => {
  useEffect(() => {
    el.addEventListener('scroll', callback);

    return () => {
      el.removeEventListener('scroll', callback);
    };
  }, [callback, el]);
};

export default useOnScroll;
