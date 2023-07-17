import { strings } from "./Localization";

const setDDMMYYYYtoYYYYMMDD = (date) => {
  const [day, month, year] = date.split("/");
  const formattedDate = year + "/" + month + "/" + day;
  return new Date(formattedDate);
};

const setYYYYMMDDtoDDMMYYYY = (date) => {
  const [year, month, day] = date.split("-");
  const formattedDate = day + "/" + month + "/" + year;
  return formattedDate;
};

const getNumberOfDays = ({ date, formatted }) => {
  let formattedDate = "";
  if (formatted) {
    formattedDate = new Date(date);
  } else {
    formattedDate = setDDMMYYYYtoYYYYMMDD(date);
  }
  const endDate = new Date(
    formattedDate.getTime() +
      Math.abs(formattedDate.getTimezoneOffset() * 60000)
  );
  const dateToday = new Date();
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = endDate.getTime() - dateToday.getTime();
  const diffInDays = Math.round(diffInTime / oneDay);

  return diffInDays;
};

const getGreetingFromTimeOfDay = () => {
  const date = new Date();
  const hour = date.getHours();
  let greeting = "";
  if (hour >= 0 && hour < 12) {
    greeting = strings.goodMorning;
  } else if (hour >= 12 && hour < 18) {
    greeting = strings.goodAfternoon;
  } else {
    greeting = strings.goodEvening;
  }
  return greeting;
};

module.exports = {
  getNumberOfDays,
  setYYYYMMDDtoDDMMYYYY,
  getGreetingFromTimeOfDay
};
