import { useReducer, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  CreateNewFile,
  initialStateMainPage,
  MainPageReducer,
  MainPageReducerActionType,
} from "../lib";
import { BASE } from "../../../lib";
import { FormValues } from "../../../types/interface";
import { NewPlayer } from "../../Socket/types";
import { CreateMaster } from "../../Socket/lib/createMaster";

import { HandlersMainPageContextModel } from "../types/interface";

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
