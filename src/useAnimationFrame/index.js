import { useRef, useEffect, useCallback } from 'react';

const useAnimationFrame = (callback) => {
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const animate = useCallback((time) => {
    if (typeof previousTimeRef.current !== 'undefined') {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [previousTimeRef, requestRef, callback]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);
};

export default useAnimationFrame;
