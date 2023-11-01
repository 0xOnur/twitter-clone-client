import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TenorImage } from "gif-picker-react";

export interface ChatComposerState {
  messageContent: string;
  tenorGif: TenorImage | undefined;
  messageMedia: {
    mediaFile: File | undefined;
    mediaURL: string;
  };
  replyMessage: IMessage | undefined;
}

const initialState: ChatComposerState = {
  messageContent: "",
  tenorGif: undefined,
  messageMedia: {
    mediaFile: undefined,
    mediaURL: "",
  },
  replyMessage: undefined,
};

interface RootState {
  chatComposer: ChatComposerState;
}

export const chatComposerSlice = createSlice({
  name: "chatComposer",
  initialState,
  reducers: {
    setMessageContent: (state, action: PayloadAction<string>) => {
      state.messageContent = action.payload;
    },
    setTenorGif: (state, action: PayloadAction<TenorImage | undefined>) => {
      state.tenorGif = action.payload;
    },
    setMessageMedia: (
      state,
      action: PayloadAction<
        {
          mediaFile: File;
          mediaURL: string;
        }
      >
    ) => {
      state.messageMedia = action.payload;
    },
    setReplyMessage: (state, action: PayloadAction<IMessage>) => {
      state.replyMessage = action.payload;
    },
    clearReplyMessage: (state) => {
      state.replyMessage = undefined;
    },
    clearMessageMedia :
    (state)=> 	{
      state.messageMedia = {
        mediaFile: new File([], ""),
        mediaURL: "",
      };
      state.tenorGif = undefined;
    },
    clearChatComposer: (state) => {
      state.messageContent = "";
      state.tenorGif = undefined;
      state.messageMedia = {
        mediaFile: new File([], ""),
        mediaURL: "",
      };
      state.replyMessage = undefined;
    },
  },
});

export const { 
  setMessageContent,
  setTenorGif,
  setMessageMedia,
  setReplyMessage, 
  clearReplyMessage,
  clearMessageMedia,
  clearChatComposer,
 } = chatComposerSlice.actions;
export const selectChatComposer = (state: RootState) => state.chatComposer;
export default chatComposerSlice.reducer;
