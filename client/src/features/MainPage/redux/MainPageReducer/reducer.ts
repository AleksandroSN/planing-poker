import { FluxStandardAction } from "flux-standard-action";
import { NewPlayer } from "../../../Socket/types";
import { MainPageReducerAction } from "./actions";

interface MainPageState {
  inputFileLabel: string;
  avatar: string;
  newPlayer: NewPlayer | Record<string, never>;
  isAuth: boolean;
  role: "Dealer" | "Member" | "Observer" | "";
  openModal: boolean;
}

export const initialStateMainPage: MainPageState = {
  inputFileLabel: "",
  avatar: "NN",
  newPlayer: {},
  isAuth: false,
  role: "",
  openModal: false,
};

export const MainPageReducer = (
  state: MainPageState,
  action: FluxStandardAction
): MainPageState => {
  switch (action.type) {
    //   case (MainPageReducerAction.authorization): {
    //     // const
    //     return {...state, }
    //   }
    default:
      return state;
  }
};
