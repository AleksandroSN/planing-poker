import { FunctionComponent } from "react";
import "./App.scss";
import { Socket } from "./features/Socket/components/Socket";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

export const App: FunctionComponent = (): JSX.Element => {
  return (
    <div className="App">
      <Socket />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Header />
      <Footer />
    </div>
  );
};
