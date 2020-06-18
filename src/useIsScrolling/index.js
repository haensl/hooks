import { useState, useCallback } from 'react';
import { useDebounce, useOnScroll } from '../';

const useIsScrolling = (
  el = window,
  scrollEndMs = 100
) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const onScroll = useCallback(() => {
    setIsScrolling(true);
  }, []);
  const onScrollEnd = useCallback(() => {
    setIsScrolling(false);
  }, []);

  useOnScroll(onScroll, el);
  useOnScroll(useDebounce(onScrollEnd, scrollEndMs), el);

  return isScrolling;
};

export default useIsScrolling;
