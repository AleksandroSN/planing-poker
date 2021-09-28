import {
  MainPageStateModel,
  HandlersMainPageContextModel,
} from "../../../types";

export const initialStateMainPage: MainPageStateModel = {
  inputFileLabel: "Choose file",
  avatar: "NN",
  srcAvatar: "",
  newPlayer: {},
  isAuth: false,
  role: "",
  openModal: false,
};

export const handlersMainPageContext: HandlersMainPageContextModel = {
  MainPageState: initialStateMainPage,
  setMasterRole: () => {},
  toggleModal: () => {},
  toggleAuth: () => {},
  setStrToAvatar: () => {},
  setImgToAvatar: () => {},
  submitData: () => {},
  registerMember: () => {},
};
