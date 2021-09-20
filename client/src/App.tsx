import { FunctionComponent } from "react";
import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { Socket } from "./features/Socket/components/Socket";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { RoutesConfig } from "./routes/RoutesConfig";
// import logo from "./logo.svg";
// import "./App.scss";

export const App: FunctionComponent = (): JSX.Element => {
  return (
    <div className="App">
      <Socket />
      <Header />
      <Router>
        <RoutesConfig />
      </Router>
      <Footer />
    </div>
  );
};
