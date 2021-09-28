import { FormValues } from "../../../types/interface";

export interface MainPageStateModel {
  inputFileLabel: string;
  avatar: string;
  srcAvatar: string;
  isAuth: boolean;
  role: "Dealer" | "Member" | "Observer" | "";
  openModal: boolean;
  openModalError: boolean;
}

export interface HandlersMainPageContextModel {
  MainPageState: MainPageStateModel;
  setMasterRole: () => void;
  toggleModal: () => void;
  toggleAuth: () => void;
  setStrToAvatar: (str: string) => void;
  setImgToAvatar: (img: string, label: string) => void;
  submitData: (data: FormValues) => void;
  validateLobby: (link: string) => Promise<void>;
  toggleErrorModal: () => void;
}
