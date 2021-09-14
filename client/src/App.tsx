import { FunctionComponent } from "react";
import logo from "./logo.svg";
import "./App.scss";
import { Issues } from "./features/LobbyPage";

export const App: FunctionComponent = (): JSX.Element => {
  return (
    <div className="App">
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
        <Issues />
      </header>
    </div>
  );
};
