import { useCallback, useState } from 'react';
import { platform } from '@haensl/services';
import { useDebounce, useOnScroll } from '../';

const useWindowScroll = (debounceMs = 25) => {
  const [scrollPosition, setScrollPosition]
    = useState(platform.scrollPosition());

  const onScroll = useCallback(() => {
    setScrollPosition(platform.scrollPosition());
  }, []);

  const onScrollDebounced = useDebounce(onScroll, debounceMs);

  useOnScroll(onScrollDebounced);

  return scrollPosition;
};

export default useWindowScroll;

