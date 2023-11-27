// useOutsideClick.js or useOutsideClick.ts if you're using TypeScript
import { useEffect } from 'react';

const useOutsideClick = (ref:any, callback:any) => {
  const handleClick = (e:any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
