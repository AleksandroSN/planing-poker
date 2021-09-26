import { createContext, FunctionComponent } from "react";
import { handlersMainPageContext, useReducerProvider } from "../../hooks";
import { HandlersMainPageContextModel } from "../../types";

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
