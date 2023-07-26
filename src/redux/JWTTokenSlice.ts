import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type JwtTokenState = {
  token: string;
};

// TODO: Check token from local storage first
const initialState: JwtTokenState = {
  token: "",
};

export const JwtTokenState = createSlice({
  name: "jwtToken",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = "";
    },
  },
});

export const { setToken, clearToken } = JwtTokenState.actions;
export default JwtTokenState.reducer;
