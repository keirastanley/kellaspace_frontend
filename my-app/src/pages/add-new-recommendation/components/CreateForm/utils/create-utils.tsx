export const getYouTubeId = (link: string) => {
  const linkSplitArr = link.split("/");
  return linkSplitArr[linkSplitArr.length - 1]
    ?.replace("watch?v=", "")
    .replace("http", "https")
    .replace(new RegExp("\\?si=(.*)"), "");
};
