import {
  ChatMessage,
  Issue,
  LobbySetting,
  Player,
  RoundControl,
} from "../types";

const players: Player[] = [];

const issues: Issue[] = [];

const lobbySettings: Map<string, LobbySetting> = new Map();

const chatMessages: ChatMessage[] = [];

const roundControl: Map<string, RoundControl> = new Map();

export const db = {
  players,
  issues,
  lobbySettings,
  chatMessages,
  roundControl,
};
