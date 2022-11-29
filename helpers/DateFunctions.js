const setFormatDDMMYYYYtoMMDDYYYY = (date, separator = "/") => {
  const [day, month, year] = date.split("/");
  const formattedDate =  year + separator + month + separator + day;
  return new Date(formattedDate);
};

const getNumberOfDays = (date) => {
  const formattedDate = setFormatDDMMYYYYtoMMDDYYYY(date);
  const endDate = new Date(
    formattedDate.getTime() + Math.abs(formattedDate.getTimezoneOffset() * 60000)
  );
  const dateToday = new Date();
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = endDate.getTime() - dateToday.getTime();
  const diffInDays = Math.round(diffInTime / oneDay);

  return diffInDays;
};

module.exports = {
  getNumberOfDays,
};
