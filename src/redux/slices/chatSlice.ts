import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
    replyMessage: IMessage | null;
  }

  const initialState: ChatState = {
    replyMessage: null,
  };

  interface RootState {
    chat: ChatState;
  }

  export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
      setReplyMessage: (state, action: PayloadAction<IMessage>) => {
        state.replyMessage = action.payload;
      },
      clearReplyMessage: (state) => {
        state.replyMessage = null;
      },
    },
  });

export const { setReplyMessage, clearReplyMessage } = chatSlice.actions;
export const selectReplyMessage = (state: RootState) => state.chat.replyMessage;
export default chatSlice.reducer;