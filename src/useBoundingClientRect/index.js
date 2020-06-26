import { useState, useCallback, useLayoutEffect } from 'react';
import { useDebounce, useWindowSize } from '../';

const useBoundingClientRect = (ref, debounceMs = 25) => {
  const [boundingClientRect, setBoundingClientRect] = useState(null);
  const windowSize = useWindowSize(debounceMs);

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

  useLayoutEffect(() => {
    const current = ref && ref.current;
    if (!current || typeof onResize !== 'function') {
      return;
    }

    onResize({
      target: current
    });
  }, [ref, onResize, windowSize]);

  return boundingClientRect;
};

export default useBoundingClientRect;
