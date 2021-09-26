// import { FSA } from "flux-standard-action";
import { NewPlayer } from "../../../Socket/types";
import { MainPageReducerActionType } from "./actions";

interface MainPageState {
  inputFileLabel: string;
  avatar: string;
  newPlayer: NewPlayer | Record<string, never>;
  isAuth: boolean;
  role: "Dealer" | "Member" | "Observer" | "";
  openModal: boolean;
}

export interface MainPageReducerAction {
  type: MainPageReducerActionType;
  payload: unknown;
}

export const MainPageReducer = (
  MainPageState: MainPageState,
  action: MainPageReducerAction
): MainPageState => {
  switch (action.type) {
    case MainPageReducerActionType.authorization:
      return {
        ...MainPageState,
        ...{ isAuth: (action.payload as unknown as MainPageState).isAuth },
      };
    case MainPageReducerActionType.setRole: {
      const newRole = (action.payload as unknown as MainPageState).role;
      const toggleModal = (action.payload as unknown as MainPageState)
        .openModal;
      return {
        ...MainPageState,
        ...{
          role: newRole,
          openModal: toggleModal,
        },
      };
    }
    case MainPageReducerActionType.openModal:
      return {
        ...MainPageState,
        ...{
          openModal: (action.payload as unknown as MainPageState).openModal,
        },
      };
    case MainPageReducerActionType.setStrToAvatar:
      return {
        ...MainPageState,
        ...{
          avatar: (action.payload as unknown as MainPageState).avatar,
        },
      };
    case MainPageReducerActionType.setImgToAvatar:
      return {
        ...MainPageState,
        ...{
          avatar: (action.payload as unknown as MainPageState).avatar,
          inputFileLabel: (action.payload as unknown as MainPageState)
            .inputFileLabel,
        },
      };
    case MainPageReducerActionType.submitForm:
      return {
        ...MainPageState,
        ...{
          openModal: (action.payload as unknown as MainPageState).openModal,
          isAuth: (action.payload as unknown as MainPageState).isAuth,
        },
      };
    default:
      return MainPageState;
  }
};
