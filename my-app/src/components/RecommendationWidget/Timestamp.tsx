/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const getDate = (isoStr: string) => isoStr.split("T")[0];
const getTime = (isoStr: string) => isoStr.split("T")[1].split(".")[0];

const strArrToNumArr = (arr: string[]) => arr.map((val) => Number(val));

export const Timestamp = ({
  dateAdded,
  dateToday,
}: {
  dateAdded: string;
  dateToday: string;
}) => {
  const [addedYear, addedMonth, addedDay] = strArrToNumArr(
    getDate(dateAdded).split("-")
  );
  const [todayYear, todayMonth, todayDay] = strArrToNumArr(
    getDate(dateToday).split("-")
  );
  const [addedHour] = strArrToNumArr(getTime(dateAdded).split(":"));
  const [todayHour] = strArrToNumArr(getTime(dateToday).split(":"));

  const formatStr = (val: number, timeStr: string) =>
    val > 1 ? `${val} ${timeStr}s ago` : `${val} ${timeStr} ago`;

  const getAgoString = () => {
    if (addedYear === todayYear) {
      if (addedMonth === todayMonth) {
        if (addedDay == todayDay) {
          if (addedHour === todayHour) {
            return "< 1 hour ago";
          }
          return formatStr(todayHour - addedHour, "hour");
        }
        return formatStr(todayDay - addedDay, "day");
      }
      return formatStr(todayMonth - addedMonth, "month");
    }
    return formatStr(todayYear - addedYear, "year");
  };

  const agoString = getAgoString();

  return (
    <p
      css={css`
        font-size: 9px;
      `}
    >
      {agoString}
    </p>
  );
};
