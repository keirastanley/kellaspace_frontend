import { useState, useEffect } from "react";

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenWidth;
};
