// --- File: frontend/chatSlice.ts ---
import { ChatMessage } from '@/types/chat.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
  messages: ChatMessage[];
}

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<ChatMessage[]>) {
      state.messages = action.payload;
    },
    addMessage(state, action: PayloadAction<ChatMessage>) {
      state.messages.push(action.payload);
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
});

export const { setMessages, addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
