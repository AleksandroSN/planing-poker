import { FormValues } from "../../../types/interface";
import { NewPlayer } from "../../Socket/types";

export interface MainPageStateModel {
  inputFileLabel: string;
  avatar: string;
  newPlayer: NewPlayer | Record<string, never>;
  isAuth: boolean;
  role: "Dealer" | "Member" | "Observer" | "";
  openModal: boolean;
}

export interface HandlersMainPageContextModel {
  MainPageState: MainPageStateModel;
  setMasterRole: () => void;
  setMemberRole: () => void;
  toggleModal: () => void;
  toggleAuth: () => void;
  setStrToAvatar: (str: string) => void;
  setImgToAvatar: (img: string, label: string) => void;
  submitData: (data: FormValues) => void;
}
