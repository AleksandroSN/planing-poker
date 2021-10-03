export const arrToNumber = (arr: string[]): number => {
  let result = 0;
  if (arr.length === 2) {
    for (let i = 0; i < arr.length; i += 1) {
      if (i === 0) {
        result += Number(arr[i]) * 60;
      } else result += Number(arr[i]);
    }
  }
  return result;
};
