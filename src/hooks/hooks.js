import { useEffect, useRef } from "react";

export function useOutSideClick({ handleOutsideClick }) {
  const wrapper = useRef(null);
  useEffect(() => {
    function outSideClick(e) {
      if (!wrapper.current.contains(e.target)) {
        handleOutsideClick?.();
      }
    }
    document.addEventListener("mousedown", outSideClick);
    return () => {
      document.removeEventListener("mousedown", outSideClick);
    };
  }, [wrapper]);
  return wrapper;
}
