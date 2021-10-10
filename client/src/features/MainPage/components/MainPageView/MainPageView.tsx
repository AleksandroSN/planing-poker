import { FunctionComponent } from "react";
import { ReducerProvider } from "../../lib/context";
import { Layout } from "../Layout";
import "./style.scss";
import "98.css";

export const MainPageView: FunctionComponent = (): JSX.Element => {
  return (
    <>
      <ReducerProvider>
        <Layout />
      </ReducerProvider>
    </>
  );
};
