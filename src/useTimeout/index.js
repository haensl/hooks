import { useEffect, useRef } from 'react';
import useIsomorphicLayoutEffect from '../useIsomorphicLayoutEffect';

const useTimeout = (callback, timeoutMs = 0) => {
  const cb = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    cb.current = callback;
  }, [callback]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      cb.current();
    }, timeoutMs);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeoutMs]);
};

export default useTimeout;
