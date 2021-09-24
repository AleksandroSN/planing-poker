import { NewPlayer } from "../../../Socket/types";

interface MainPageFormState {
  inputFileLabel: string;
  avatar: string;
  newPlayer: NewPlayer | Record<string, never>;
  isAuth: boolean;
}

export const initialStateMainPageForm: MainPageFormState = {
  inputFileLabel: "",
  avatar: "NN",
  newPlayer: {},
  isAuth: false,
};
