import { FluxStandardAction } from "flux-standard-action";
import { ChatMessage } from "../../features/Socket/types";
import { ChatMessagesReducerActions } from "./actions";

type ChatMessagesState = {
  chatMessages: ChatMessage[];
};

const initialChatMessagesState: ChatMessagesState = {
  chatMessages: [],
};

export const chatMessagesReducer = (
  state: ChatMessagesState = initialChatMessagesState,
  action: FluxStandardAction
): ChatMessagesState => {
  switch (action.type) {
    case ChatMessagesReducerActions.addMessage: {
      const newMessage = action.payload as unknown as ChatMessage;
      return { ...state, chatMessages: [...state.chatMessages, newMessage] };
    }
    case ChatMessagesReducerActions.updateMessages: {
      const newMessages = action.payload as unknown as ChatMessage[];
      return { ...state, chatMessages: newMessages };
    }
    default:
      return state;
  }
};
