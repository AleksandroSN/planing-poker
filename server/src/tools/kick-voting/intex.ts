import { db } from "../../db/db";

export const kickDb = () => {
  const kicks: Map<string, string> = new Map();
  return {
    createKick: () => {
      console.log("KICK_MEMBER");
    },
    checkKick: () => {
      console.log("KICK_MEMBER");
    },
  };
};
