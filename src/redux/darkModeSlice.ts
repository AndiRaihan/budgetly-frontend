import { createSlice } from "@reduxjs/toolkit";

export interface DarkModeState {
  isDarkMode: boolean;
}

const localStoragePreferDark = localStorage.getItem("preferDarkMode");
let prefersDark =
  localStoragePreferDark === null
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
    : localStoragePreferDark === "true";
const initialState: DarkModeState = {
  isDarkMode: prefersDark,
};

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("preferDarkMode", JSON.stringify(state.isDarkMode));
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
