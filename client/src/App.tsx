import { FunctionComponent } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { RoutesConfig } from "./routes/RoutesConfig";
// import logo from "./logo.svg";
// import "./App.scss";

export const App: FunctionComponent = (): JSX.Element => {
  return (
    <div className="App">
      {/* <header className="App-header">
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
      </header> */}
      <Router>
        <RoutesConfig />
      </Router>
    </div>
  );
};
