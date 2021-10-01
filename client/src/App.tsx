import { FunctionComponent } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Socket } from "./features/Socket";
import { Footer, Header, Loader } from "./components";
import { RoutesConfig } from "./routes";
import "./App.scss";

export const App: FunctionComponent = (): JSX.Element => {
  return (
    <>
      <Socket />
      <Loader />
      <Header />
      <Router>
        <RoutesConfig />
      </Router>
      <Footer />
    </>
  );
};
