import { createSlice } from "@reduxjs/toolkit";

export interface DarkModeState {
  isDarkMode: boolean;
}

// TODO: Check user preference from local storage first
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialState: DarkModeState = {
  isDarkMode: prefersDark,
};

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
