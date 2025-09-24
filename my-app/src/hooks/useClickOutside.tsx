import { RefObject, useEffect } from "react";

export function useClickOutside<T extends HTMLElement>({
  ref,
  callback,
  active,
}: {
  ref: RefObject<T | null>;
  callback: () => void;
  active: boolean;
}) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    if (active) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active]);
}
