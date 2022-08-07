import { useEffect, useRef } from 'react';

const useInterval = (callback, intervalMs) => {
  const cb = useRef(callback);

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
