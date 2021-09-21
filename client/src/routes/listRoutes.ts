import { Page404 } from "../features/404Page";
import { GamePage } from "../features/GamePage";
import { LobbyPage } from "../features/LobbyPage";
import { MainPage } from "../features/MainPage";

export const listRoutes = [
  { path: "/", name: "Home", Component: MainPage },
  { path: "/lobby/:id", name: "Lobby", Component: LobbyPage },
  { path: "/game/:id", name: "Game", Component: GamePage },
  { path: "*", name: "404", Component: Page404 },
];
