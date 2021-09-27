import { ChatMessage, Issue, LobbySetting, Player } from "../types";

const players: Player[] = [];

const issues: Issue[] = [];

const lobbySettings: Map<string, LobbySetting> = new Map();

const chatMessages: ChatMessage[] = [];

const sockets: Map<string, string> = new Map();

export const db = {
  players,
  issues,
  lobbySettings,
  chatMessages,
  sockets,
};
