import { useState, useCallback, useEffect } from 'react';
import { platform } from '@haensl/services';
import { useDebounce } from '../';

const useWindowSize = (debounceMs = 25) => {
  const [size, setSize] = useState(null);
  const onResize = useCallback(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  const onResizeDebounced = useDebounce(onResize, debounceMs);

  useEffect(() => {
    if (!platform.hasWindow) {
      return;
    }

    window.addEventListener('resize', onResizeDebounced);
    onResize();
    return () => {
      window.removeEventListener('resize', onResizeDebounced);
    };
  }, [onResize, onResizeDebounced]);

  return size;
};

export default useWindowSize;
