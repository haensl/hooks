import _useAnimationFrame from './useAnimationFrame';
import _useBoundingClientRect from './useBoundingClientRect';
import _useDebounce from './useDebounce';
import _useIsScrolling from './useIsScrolling';
import _useOnScroll from './useOnScroll';
import _useWindowScroll from './useWindowScroll';
import _useWindowSize from './useWindowSize';

export const useAnimationFrame = _useAnimationFrame;
export const useBoundingClientRect = _useBoundingClientRect;
export const useDebounce = _useDebounce;
export const useIsScrolling = _useIsScrolling;
export const useOnScroll = _useOnScroll;
export const useWindowScroll = _useWindowScroll;
export const useWindowSize = _useWindowSize;

const exports = {
  useAnimationFrame,
  useBoundingClientRect,
  useDebounce,
  useIsScrolling,
  useOnScroll,
  useWindowScroll,
  useWindowSize
};

export default exports;
