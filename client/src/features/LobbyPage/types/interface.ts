import { LobbySetting } from "../../Socket/types";

export type UpdatedSettings = Omit<
  LobbySetting,
  "cardsCover" | "lobbyId" | "masterId"
>;
