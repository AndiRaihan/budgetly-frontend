import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AccountState = {
  token: string;
  id: string;
};

// TODO: Check token from local storage first
const initialState: AccountState = {
  id: "",
  token: "",
};

export const JwtTokenState = createSlice({
  name: "jwtToken",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setID: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    clearToken: (state) => {
      state.token = "";
    },
  },
});

export const { setToken, clearToken } = JwtTokenState.actions;
export default JwtTokenState.reducer;
