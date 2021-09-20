import { FunctionComponent } from "react";
import "./App.scss";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

export const App: FunctionComponent = (): JSX.Element => {
  return (
    <div className="App">
      <Header />
      <Footer />
    </div>
  );
};
