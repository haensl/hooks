import { useMemo } from 'react';
import { throttle } from '@haensl/services';

const useDebounce = (fn, debounceMs) => {
  if (typeof fn !== 'function') {
    throw new TypeError(`Invalid type. Expected function but received ${typeof fn}`);
  }

  if (typeof debounceMs !== 'number') {
    throw new TypeError(`Invalid type. Expected number but received ${typeof debounceMs}`);
  }

  return useMemo(
    () => throttle.debounce(fn, parseInt(debounceMs, 10)),
    [fn, debounceMs]
  );
};

export default useDebounce;

