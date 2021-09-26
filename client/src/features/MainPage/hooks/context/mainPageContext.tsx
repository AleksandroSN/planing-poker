import { createContext, FunctionComponent } from "react";
// import { handlersMainPageContext } from "../../hooks";
import { useReducerProvider } from "../reducer/useReduceProvider";
import {
  HandlersMainPageContextModel,
  MainPageStateModel,
} from "../../types/interface";

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
  setMemberRole: () => {},
  toggleModal: () => {},
  toggleAuth: () => {},
  setStrToAvatar: () => {},
  setImgToAvatar: () => {},
  submitData: () => {},
};

export const MainPageContext = createContext<HandlersMainPageContextModel>(
  handlersMainPageContext
);

export const ReducerProvider: FunctionComponent = ({
  children,
}): JSX.Element => {
  const ReducerProviderCTX = useReducerProvider();

  return (
    <MainPageContext.Provider value={ReducerProviderCTX}>
      {children}
    </MainPageContext.Provider>
  );
};
