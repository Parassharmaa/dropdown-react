import { useEffect } from "react";

interface OutsideClickHandlerProps {
  className: string;
  handler: () => void;
}

const useClickOutside = ({ className, handler }: OutsideClickHandlerProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // check if the event target is outside the className element
      if (
        event.target instanceof HTMLElement &&
        !event.target.closest(`.${className}`)
      ) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [className, handler]);
};

export default useClickOutside;
