export const handlerTime = (arr: string[]): string[] => {
  const modifyArr: string[] = [];
  arr.forEach((el) => {
    const y = Number(el) >= 10 ? `${el}` : `0${el}`;
    modifyArr.push(y);
  });
  return modifyArr;
};
