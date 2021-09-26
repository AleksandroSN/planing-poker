import {
  createContext,
  FunctionComponent,
  useCallback,
  useReducer,
} from "react";
import { useDispatch } from "react-redux";
import { CreateNewFile } from "..";
import { BASE } from "../../../../lib";
import { FormValues } from "../../../../types/interface";
import { CreateMaster } from "../../../Socket/lib/createMaster";
import { NewPlayer } from "../../../Socket/types";
import { MainPageReducer } from "../../redux/MainPageReducer";
import { MainPageReducerActionType } from "../../redux/MainPageReducer/actions";

interface MainPageState {
  inputFileLabel: string;
  avatar: string;
  newPlayer: NewPlayer | Record<string, never>;
  isAuth: boolean;
  role: "Dealer" | "Member" | "Observer" | "";
  openModal: boolean;
}

interface IhandlersMainPageContext {
  MainPageState: MainPageState;
  setMasterRole: () => void;
  setMemberRole: () => void;
  toggleModal: () => void;
  toggleAuth: () => void;
  setStrToAvatar: (str: string) => void;
  setImgToAvatar: (img: string, label: string) => void;
  submitData: (data: FormValues) => void;
}

const initialStateMainPage: MainPageState = {
  inputFileLabel: "Choose file",
  avatar: "NN",
  newPlayer: {},
  isAuth: false,
  role: "",
  openModal: false,
};

const handlersMainPageContext: IhandlersMainPageContext = {
  MainPageState: initialStateMainPage,
  setMasterRole: () => {},
  setMemberRole: () => {},
  toggleModal: () => {},
  toggleAuth: () => {},
  setStrToAvatar: () => {},
  setImgToAvatar: () => {},
  submitData: () => {},
};

export const MainPageContext = createContext<IhandlersMainPageContext>(
  handlersMainPageContext
);

export const ReducerProviderHelper = (): IhandlersMainPageContext => {
  const [MainPageState, dispatch] = useReducer(
    MainPageReducer,
    initialStateMainPage
  );
  const reduxDispatch = useDispatch();

  const setMasterRole = () => {
    dispatch({
      type: MainPageReducerActionType.setRole,
      payload: { role: "Dealer", openModal: true },
    });
  };

  const setMemberRole = () => {
    dispatch({
      type: MainPageReducerActionType.setRole,
      payload: { role: "Member", openModal: true },
    });
  };

  const toggleModal = () => {
    dispatch({
      type: MainPageReducerActionType.openModal,
      payload: { openModal: !MainPageState.openModal },
    });
  };

  const toggleAuth = () => {
    dispatch({
      type: MainPageReducerActionType.authorization,
      payload: { isAuth: !MainPageState.isAuth },
    });
  };

  const setStrToAvatar = useCallback((str: string) => {
    dispatch({
      type: MainPageReducerActionType.setStrToAvatar,
      payload: { avatar: str },
    });
  }, []);

  const setImgToAvatar = useCallback((img: string, label: string) => {
    dispatch({
      type: MainPageReducerActionType.setImgToAvatar,
      payload: { avatar: img, inputFileLabel: label },
    });
  }, []);

  const submitData = async (data: FormValues) => {
    const files = data["Choose file"] as FileList;
    const file = files[0];
    const fileName = files[0].name;
    if (files) {
      const res = await CreateNewFile(file, fileName);
      const observerRole = data["Connect as Observer"] && "Observer";
      const player: NewPlayer = {
        firstName: data["Your first name"],
        lastName: data["Your last name"],
        jobPosition: data["Your Job position"],
        avatarImage: `${BASE}${res[0].path}`,
        role: observerRole || MainPageState.role,
      };
      const socketRes = await CreateMaster(player, reduxDispatch);
      localStorage.setItem("player", JSON.stringify(socketRes));
      dispatch({
        type: MainPageReducerActionType.submitForm,
        payload: {
          openModal: !MainPageState.openModal,
          isAuth: !MainPageState.isAuth,
        },
      });
    }
  };

  return {
    MainPageState,
    setMasterRole,
    setMemberRole,
    toggleModal,
    toggleAuth,
    setStrToAvatar,
    setImgToAvatar,
    submitData,
  };
};

export const ReducerProvider: FunctionComponent = ({
  children,
}): JSX.Element => {
  const ReducerProviderCTX = ReducerProviderHelper();

  return (
    <MainPageContext.Provider value={ReducerProviderCTX}>
      {children}
    </MainPageContext.Provider>
  );
};
