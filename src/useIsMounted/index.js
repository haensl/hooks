import { useCallback, useEffect, useRef } from 'react';

const useIsMounted = () => {
  const mountRef = useRef(true);
  const isMounted = useCallback(() => mountRef.current, [mountRef]);

  useEffect(() => {
    return () => {
      mountRef.current = false;
    };
  }, []);

  return isMounted;
};

export default useIsMounted;
