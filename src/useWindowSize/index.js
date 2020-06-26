import { useState, useEffect } from 'react';
import { useDebounce } from '../';

const useWindowSize = (debounceMs = 25) => {
  const [size, setSize] = useState(null);

  const onResize = useDebounce(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, debounceMs);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  return size;
};

export default useWindowSize;
