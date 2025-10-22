import { useMemo } from "react";
import { useScreenWidth } from "./useScreenWidth";
import { breakpointVals } from "../utils/utils";

export const useScreenSize = () => {
  const screenWidth = useScreenWidth();

  const screenSize = useMemo(() => {
    if (screenWidth < breakpointVals.mobileLg) {
      return "mobileSm";
    } else if (screenWidth < breakpointVals.tabletSm) {
      return "mobileLg";
    } else if (screenWidth < breakpointVals.tabletMd) {
      return "tabletSm";
    } else if (screenWidth < breakpointVals.tabletLg) {
      return "tabletMd";
    } else if (screenWidth < breakpointVals.desktopSm) {
      return "tabletLg";
    } else if (screenWidth < breakpointVals.desktopMd) {
      return "desktopSm";
    } else if (screenWidth < breakpointVals.desktopLg) {
      return "desktopMd";
    }
    return "desktopLg";
  }, [screenWidth]);

  return screenSize;
};
