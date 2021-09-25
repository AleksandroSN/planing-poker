export const findID = (str: string): string => {
  const regExp = /(\w+)(?!.*\d)/g;
  const id = str.substr(str.search(regExp)).slice(0, -1);
  return id;
};

// TO-DO http://localhost:3000/lobby/5b71b40b-8ebc-4312-89e0-08bdbc486c04 -> 08bdbc486c04 rework
