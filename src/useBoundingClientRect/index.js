import { useState, useCallback, useLayoutEffect } from 'react';
import { useDebounce } from '../';

const useBoundingClientRect = (ref, debounceMs = 25) => {
  const [boundingClientRect, setBoundingClientRect] = useState(null);

  const onResize = useCallback(({ target }) => {
    if (!target) {
      return;
    }

    const clientRect = target.getBoundingClientRect();
    setBoundingClientRect(clientRect);
  }, []);

  const onResizeDebounced = useDebounce(onResize, debounceMs);

  useLayoutEffect(() => {
    const current = ref.current;

    if (!current) {
      return;
    }

    const resizeObserver = new ResizeObserver(onResizeDebounced);
    resizeObserver.observe(current);
    onResize({ target: current });
    return () => {
      resizeObserver.unobserve(current);
    };
  }, [ ref, onResize, onResizeDebounced]);

  return boundingClientRect;
};

export default useBoundingClientRect;
