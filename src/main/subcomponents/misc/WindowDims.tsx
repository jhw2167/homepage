import { useState, useEffect } from 'react';

export default function useWindowDimensions() {
  let dims = {
    w : window.innerWidth,
    h : window.innerHeight
  }

    useEffect(() => {
      function handleResize() {
      dims.w = window.innerWidth;
      dims.h = window.innerHeight;
      }
      window.addEventListener('resize', handleResize)
      return () => { window.removeEventListener('resize', handleResize)   }
  });


  return dims;
}