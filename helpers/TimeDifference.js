export const TimeDifference = (end) => {
  const date1 = new Date();
  const date2 = new Date(end);
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = date2.getTime() - date1.getTime();
  const diffInDays = Math.ceil(Math.round(diffInTime / oneDay));
  return diffInDays;
};
