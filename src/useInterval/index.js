import { useEffect, useRef } from 'react';
import useIsomorphicLayoutEffect from '../useIsomorphicLayoutEffect';

const useInterval = (callback, intervalMs) => {
  const cb = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    cb.current = callback;
  }, [callback]);

  useEffect(() => {
    if (typeof cb.current !== 'function') {
      return;
    }

    const intervalId = setInterval(() => cb.current(), intervalMs);
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalMs]);
};

export default useInterval;
