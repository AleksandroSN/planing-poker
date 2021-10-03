import { Page404 } from "../features/404Page";
import { GamePage } from "../features/GamePage";
import { LobbyPage } from "../features/LobbyPage";
import { MainPage } from "../features/MainPage";
import { ResultPage } from "../features/ResultPage";

export const listRoutes = [
  { path: "/", name: "Home", Component: MainPage },
  { path: "/lobby/:id", name: "Lobby", Component: LobbyPage },
  { path: "/game/:id", name: "Game", Component: GamePage },
  { path: "/result/:id", name: "Result", Component: ResultPage },
  { path: "*", name: "404", Component: Page404 },
];
