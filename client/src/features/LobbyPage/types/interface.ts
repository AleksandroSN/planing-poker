import { LobbySetting } from "../../Socket/types";

export type UpdatedSettings = Omit<
  LobbySetting,
  "cardValues" | "cardsCover" | "lobbyId" | "masterId"
>;
