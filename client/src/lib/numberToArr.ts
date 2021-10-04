export const numberToArr = (num: number): string[] => {
  const arrString: string[] = [];
  const minutes = String(Math.floor(num / 60));
  arrString.push(minutes);
  const seconds = String(Math.floor(num % 60));
  arrString.push(seconds);
  return arrString;
};
