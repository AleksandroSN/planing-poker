export const getSmthInLobby = <T extends { lobbyId: string }>(
  lobby: string,
  smth: T[]
): Promise<T[]> => {
  const data = smth.filter((smthElem) => smthElem.lobbyId === lobby);
  if (data.length > 0) return Promise.resolve(data);
  else return Promise.resolve([]);
};

export const getSmthById = <T extends { id: string }>(
  id: string,
  smth: T[]
): Promise<T | false> => {
  const index = smth.findIndex((smthElem) => smthElem.id === id);
  if (index >= 0) return Promise.resolve(smth[index]);
  else return Promise.resolve(false);
};

export const deleteSmth = <T extends { id: string }>(
  id: string,
  smth: T[]
): Promise<T | false> => {
  const index = smth.findIndex((smthElem) => smthElem.id === id);
  if (index >= 0) {
    const result = smth[index];
    smth.splice(index, 1);
    return Promise.resolve(result);
  } else return Promise.resolve(false);
};
