import { Recommendation, Breakpoint } from "../interfaces";
import parse from "html-react-parser";

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

export const parseHtmlToReact = (str: string) => {
  const urlRegex = /((https?:\/\/|www\.)[^\s<]+)/gi;
  return parse(str, {
    replace: (node) => {
      if (node.type === "text") {
        const textNode = node as unknown as Text;
        const parts = textNode.data.split(urlRegex);
        if (parts.length === 1) return;
        return (
          <>
            {parts.map((part, index) => {
              if (part === "https://") {
                return "";
              }
              if (urlRegex.test(part)) {
                const href = part.startsWith("http") ? part : `https://${part}`;
                console.log(href);
                return (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {href}
                  </a>
                );
              }
              return part;
            })}
          </>
        );
      }
    },
  });
};
