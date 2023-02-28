export const allAreNull = (arr) => {
  let result = true;

  for (const value of arr) {
    if (value !== null) {
      result = false;
      break;
    }
  }

  return result;
};
