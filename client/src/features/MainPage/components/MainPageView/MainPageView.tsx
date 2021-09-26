import { FunctionComponent } from "react";
import { ReducerProvider } from "../../hooks/context/mainPageContext";
import { Layout } from "../Layout";
import "./style.scss";

// interface MainPageViewProps {
//     message?: string;
// }

export const MainPageView: FunctionComponent = (): JSX.Element => {
  return (
    <>
      <ReducerProvider>
        <Layout />
      </ReducerProvider>
    </>
  );
};
