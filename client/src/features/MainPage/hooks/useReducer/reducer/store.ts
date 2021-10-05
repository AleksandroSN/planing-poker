import {
  MainPageStateModel,
  HandlersMainPageContextModel,
} from "../../../types";

export const initialStateMainPage: MainPageStateModel = {
  inputFileLabel: "Choose file",
  avatar: "NN",
  srcAvatar: "",
  isAuth: false,
  role: "",
  openModal: false,
  openModalError: false,
  isObserver: false,
};

export const handlersMainPageContext: HandlersMainPageContextModel = {
  MainPageState: initialStateMainPage,
  setMasterRole: () => {},
  setObserverRole: () => {},
  toggleModal: () => {},
  toggleAuth: () => {},
  setStrToAvatar: () => {},
  setImgToAvatar: () => {},
  submitData: () => {},
  validateLobby: async () => {},
  toggleErrorModal: () => {},
};
