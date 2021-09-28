import { FormValues } from "../../../types/interface";
import { NewPlayer } from "../../Socket/types";

export interface MainPageStateModel {
  inputFileLabel: string;
  avatar: string;
  srcAvatar: string;
  newPlayer: NewPlayer | Record<string, never>;
  isAuth: boolean;
  role: "Dealer" | "Member" | "Observer" | "";
  openModal: boolean;
}

export interface HandlersMainPageContextModel {
  MainPageState: MainPageStateModel;
  setMasterRole: () => void;
  toggleModal: () => void;
  toggleAuth: () => void;
  setStrToAvatar: (str: string) => void;
  setImgToAvatar: (img: string, label: string) => void;
  submitData: (data: FormValues) => void;
  registerMember: (link: string) => void;
}
