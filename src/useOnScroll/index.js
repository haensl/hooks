import { useEffect } from 'react';
import { platform } from '@haensl/services';

const useOnScroll = (callback, el = platform.hasWindow && window) => {
  useEffect(() => {
    el.addEventListener('scroll', callback);

    return () => {
      el.removeEventListener('scroll', callback);
    };
  }, [callback, el]);
};

export default useOnScroll;
