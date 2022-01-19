import { useState, useCallback } from 'react';
import { useDebounce, useIsMounted, useOnScroll } from '../';

const useIsScrolling = (
  el = window,
  scrollEndMs = 100
) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const isMounted = useIsMounted();
  const onScroll = useCallback(() => {
    setIsScrolling(true);
  }, []);
  const onScrollEnd = useCallback(() => {
    if (isMounted()) {
      setIsScrolling(false);
    }
  }, [isMounted]);

  useOnScroll(onScroll, el);
  useOnScroll(useDebounce(onScrollEnd, scrollEndMs), el);

  return isScrolling;
};

export default useIsScrolling;
