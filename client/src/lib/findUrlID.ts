export const findID = (str: string): string => {
  const regExp = /(\w+)(?!.*\d)/g;
  const id = str.substr(str.search(regExp)).slice(0, -1);
  return id;
};
