import { useReducer, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  MainPageReducer,
  initialStateMainPage,
  MainPageReducerActionType,
} from ".";
import { BASE_SERVER, uploadImage } from "../../../../lib";
import { FormValues } from "../../../../types/interface";
import { CreateMaster } from "../../../Socket/lib/createMaster";
import { NewPlayer } from "../../../Socket/types";
import { HandlersMainPageContextModel } from "../../types";

export const useReducerProvider = (): HandlersMainPageContextModel => {
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
    const srcAvatar = await uploadImage(data);
    const observerRole = data["Connect as Observer"] && "Observer";
    const player: NewPlayer = {
      firstName: data["Your first name"],
      lastName: data["Your last name"],
      jobPosition: data["Your Job position"],
      avatarImage: srcAvatar ? `${BASE_SERVER}${srcAvatar.path}` : "",
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
