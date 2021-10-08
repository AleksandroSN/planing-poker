export const gameStatus = (appStage: string): string => {
  switch (appStage) {
    case "lobby":
      return "planning";
    case "game":
      return "start";
    case "results":
      return "end";
    default:
      return "";
  }
};
