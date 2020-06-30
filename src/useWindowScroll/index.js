import { useCallback, useState } from 'react';
import { platform } from '@haensl/services';
import { useDebounce, useOnScroll } from '../';

const useWindowScroll = (debounceMs = 25) => {
  const [scrollPosition, setScrollPosition]
    = useState(platform.scrollPosition());

  const handler = useCallback(() => {
    setScrollPosition(platform.scrollPosition());
  }, []);

  const handlerDebounced = useDebounce(handler, debounceMs);

  useOnScroll(handlerDebounced);

  return scrollPosition;
};

export default useWindowScroll;

