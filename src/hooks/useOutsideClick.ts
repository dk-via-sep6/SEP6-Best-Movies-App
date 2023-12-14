import { useEffect, useCallback, RefObject } from "react";

const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  callback: () => void
): void => {
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    },
    [ref, callback]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClick]);
};

export default useOutsideClick;
