export const findID = (str: string): string => {
  return str.substr(str.lastIndexOf("/") + 1);
};
