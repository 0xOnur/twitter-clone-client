import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export interface AppearanceState {
  theme: ITheme;
  color: IColors;
  fontSize: number;
  boxShadow: string;
}

const initialState: AppearanceState = {
  theme: {
    name: 'light',
    primary: '#ffffff',
		secondary: '#f7f9f9',
		third: '#eff3f4',
		modal: '#00000066'
  },
  color: {
    primary: "#1d9bf0",
    secondary: "#8ecdf8",
    base: '#0f1419',
		baseSecondary: '#536471'
  },
  fontSize: 16,
  boxShadow: 'rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px',
};

interface RootState {
  appearance: AppearanceState;
};

export const appearanceSlice = createSlice({
  name: "appearance",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ITheme>) => {
      state.theme = action.payload;
    },
    setColor: (state, action: PayloadAction<IColors>) => {
      state.color = action.payload;
    },
    setFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload;
    },
    setBoxShadow: (state, action: PayloadAction<string>) => {
      state.boxShadow = action.payload;
    },
  },
});

export const { setTheme, setColor, setFontSize, setBoxShadow } =
  appearanceSlice.actions;

export const useAppearance = () => useSelector(
  (state: RootState) => state.appearance
)
export default appearanceSlice.reducer;
