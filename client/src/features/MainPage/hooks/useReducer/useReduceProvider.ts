import { useReducer, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  MainPageReducer,
  initialStateMainPage,
  MainPageReducerActionType,
} from "./reducer";
import { uploadImage, BASE_SERVER } from "../../../../lib";
import { FormValues } from "../../../../types/interface";
import { createMaster } from "../../../Socket/lib/createMaster";
import { NewPlayer, Player } from "../../../Socket/types";
import { HandlersMainPageContextModel } from "../../types";
import { useAppSelector, GameSettingsCurrent } from "../../../../redux/store";
import { createMember } from "../../../Socket/lib/createMember";
import { checkValidityLobby } from "../../../Socket/lib/checkValidityLobby";

export const useReducerProvider = (): HandlersMainPageContextModel => {
  const [MainPageState, dispatch] = useReducer(
    MainPageReducer,
    initialStateMainPage
  );
  const reduxDispatch = useDispatch();
  const lobbyId = useAppSelector(GameSettingsCurrent);

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

  const setObserverRole = () => {
    dispatch({
      type: MainPageReducerActionType.setObserver,
      payload: { isObserver: !MainPageState.isObserver },
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

  const createPlayer = async (player: NewPlayer): Promise<Player> => {
    if (MainPageState.role === "Dealer") {
      const res = await createMaster(player, reduxDispatch);
      return res;
    }
    const res = await createMember(player, lobbyId, reduxDispatch);
    return res;
  };

  const submitData = async (data: FormValues) => {
    const srcAvatar = await uploadImage(data);
    const observerRole = data["Connect as Observer"] && "Observer";
    const player: NewPlayer = {
      firstName: data["Your first name"],
      lastName: data["Your last name"],
      jobPosition: data["Your Job position"],
      avatarImage: srcAvatar
        ? `${BASE_SERVER}${srcAvatar.path}`
        : MainPageState.avatar,
      role: observerRole || MainPageState.role,
    };
    const socketRes = await createPlayer(player);
    sessionStorage.setItem("player", JSON.stringify(socketRes));
    dispatch({
      type: MainPageReducerActionType.submitForm,
      payload: {
        openModal: !MainPageState.openModal,
        isAuth: !MainPageState.isAuth,
      },
    });
  };

  const toggleErrorModal = () => {
    dispatch({
      type: MainPageReducerActionType.validateLobby,
      payload: {
        openModalError: !MainPageState.openModalError,
      },
    });
  };
  const validateLobby = async (link: string) => {
    const isValid = await checkValidityLobby(link, reduxDispatch);
    if (isValid) {
      reduxDispatch({ type: "UPDATE_SETTINGS", payload: { lobbyId: link } });
      setMemberRole();
    } else {
      toggleErrorModal();
    }
  };

  return {
    MainPageState,
    setMasterRole,
    setObserverRole,
    toggleModal,
    toggleAuth,
    setStrToAvatar,
    setImgToAvatar,
    submitData,
    validateLobby,
    toggleErrorModal,
  };
};
