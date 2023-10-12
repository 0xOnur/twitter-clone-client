import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TenorImage } from "gif-picker-react";


export interface ComposerState {
  tweetText: string;
  tenorGif: TenorImage | undefined;
  mediaFiles: {
    file: File;
    url: string;
    type: string;
  }[];
  poll: IPoll;
  showPoll: boolean;
  settings: {
    audience: "everyone" | "specificUsers";
    whoCanReply: "everyone" | "following" | "mentioned";
  };
  isLoading: boolean;
}

const initialState: ComposerState = {
  tweetText: "",
  tenorGif: undefined,
  mediaFiles: [],
  poll: {
    choices: [
      {
        _id: 1,
        text: "",
        votes: [],
      },
      {
        _id: 2,
        text: "",
        votes: [],
      },
    ],
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
  showPoll: false,
  settings: {
    audience: "everyone",
    whoCanReply: "everyone",
  },
  isLoading: false,
};

interface RootState {
  composer: ComposerState;
}

export const composerSlice = createSlice({
  name: "composer",
  initialState,
  reducers: {
    setTweetText: (state, action: PayloadAction<string>) => {
      state.tweetText = action.payload;
    },
    setTenorGif: (state, action: PayloadAction<TenorImage | undefined>) => {
      state.tenorGif = action.payload;
    },
    setMediaFiles: (
      state,
      action: PayloadAction<
        {
          file: File;
          url: string;
          type: string;
        }[]
      >
    ) => {
      state.mediaFiles = action.payload;
    },
    removeMediaFile: (state, action: PayloadAction<number>) => {
      state.mediaFiles.splice(action.payload, 1);
    },
    setPollChoice: (
      state,
      action: PayloadAction<{ index: number; text: string }>
    ) => {
      state.poll.choices[action.payload.index].text = action.payload.text;
    },
    addPollChoice: (
      state,
      action: PayloadAction<{ _id: number; text: string }>
    ) => {
      state.poll.choices.push(action.payload);
    },
    setPollExpiresAt: (state, action: PayloadAction<string>) => {
      state.poll.expiresAt = action.payload;
    },
    setShowPoll: (state, action: PayloadAction<boolean>) => {
      state.showPoll = action.payload;
    },
    setSettings: (
      state,
      action: PayloadAction<{
        audience: "everyone" | "specificUsers";
        whoCanReply: "everyone" | "following" | "mentioned";
      }>
    ) => {
      state.settings = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearComposer: (state) => {
      state.tweetText = "";
      state.tenorGif = undefined;
      state.mediaFiles = [];
      state.showPoll = false;
      state.poll = {
        choices: [
          {
            _id: 1,
            text: "",
            votes: [],
          },
          {
            _id: 2,
            text: "",
            votes: [],
          },
        ],
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };
      state.settings = {
        audience: "everyone",
        whoCanReply: "everyone",
      };
      state.isLoading = false;
    },
  },
});

export const {
  setTweetText,
  setTenorGif,
  setMediaFiles,
  removeMediaFile,
  setShowPoll,
  setPollChoice,
  addPollChoice,
  setPollExpiresAt,
  setSettings,
  clearComposer,
  setIsLoading,
} = composerSlice.actions;

export const selectComposer = (state: RootState) => state.composer;
export default composerSlice.reducer;
