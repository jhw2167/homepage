//imports
import { useState, useEffect, useLayoutEffect } from 'react';


/*
  Custom hook for getting real time window sizes
*/


export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return {w: size[0], h: size[1]};
}