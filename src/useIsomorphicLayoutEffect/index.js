import { useLayoutEffect, useEffect } from 'react';
import { platform } from '@haensl/services';

const useIsomorphicLayoutEffect = platform.hasWindow
  ? useLayoutEffect
  : useEffect;

export default useIsomorphicLayoutEffect;
