// import { FSA } from "flux-standard-action";
import { MainPageStateModel } from "../../types";
import { MainPageReducerActionType } from "./actions";

export interface MainPageReducerAction {
  type: MainPageReducerActionType;
  payload: unknown;
}

export const MainPageReducer = (
  MainPageState: MainPageStateModel,
  action: MainPageReducerAction
): MainPageStateModel => {
  switch (action.type) {
    case MainPageReducerActionType.authorization:
      return {
        ...MainPageState,
        ...{ isAuth: (action.payload as unknown as MainPageStateModel).isAuth },
      };
    case MainPageReducerActionType.setRole: {
      const newRole = (action.payload as unknown as MainPageStateModel).role;
      const toggleModal = (action.payload as unknown as MainPageStateModel)
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
          openModal: (action.payload as unknown as MainPageStateModel)
            .openModal,
        },
      };
    case MainPageReducerActionType.setStrToAvatar:
      return {
        ...MainPageState,
        ...{
          avatar: (action.payload as unknown as MainPageStateModel).avatar,
        },
      };
    case MainPageReducerActionType.setImgToAvatar:
      return {
        ...MainPageState,
        ...{
          avatar: (action.payload as unknown as MainPageStateModel).avatar,
          inputFileLabel: (action.payload as unknown as MainPageStateModel)
            .inputFileLabel,
        },
      };
    case MainPageReducerActionType.submitForm:
      return {
        ...MainPageState,
        ...{
          openModal: (action.payload as unknown as MainPageStateModel)
            .openModal,
          isAuth: (action.payload as unknown as MainPageStateModel).isAuth,
        },
      };
    case MainPageReducerActionType.setSrcAvatar:
      return {
        ...MainPageState,
        ...{
          srcAvatar: (action.payload as unknown as MainPageStateModel)
            .srcAvatar,
        },
      };
    default:
      return MainPageState;
  }
};
