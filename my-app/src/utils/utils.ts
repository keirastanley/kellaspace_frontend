import { Recommendation, Breakpoint } from "../interfaces";

export const breakpointVals: Record<Breakpoint, number> = {
  mobileSm: 375,
  mobileLg: 480,
  tabletSm: 640,
  tabletMd: 768,
  tabletLg: 960,
  desktopSm: 1024,
  desktopMd: 1280,
  desktopLg: 1440,
};

export const breakpointObj: Record<Breakpoint, string> = Object.assign(
  {},
  ...Object.entries(breakpointVals).map(([breakpoint, value]) => ({
    [breakpoint]: `${value}px`,
  }))
);

export const getMediaQuery = (breakpoint: Breakpoint) => {
  const minWidth = breakpointObj[breakpoint];
  console.log(minWidth);
  return `@media only screen and (min-width: ${minWidth})`;
};

export const sortRecommendationsByDate = (recommendations: Recommendation[]) =>
  recommendations.sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  );
