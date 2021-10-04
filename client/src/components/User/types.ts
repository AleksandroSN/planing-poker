import { Player } from "../../features/Socket/types";

export interface UserProps {
  avatar: string;
  firstName: string;
  lastName: string;
  jobPosition: string;
  isYou: boolean;
  isChat: boolean;
  player?: Player;
}
