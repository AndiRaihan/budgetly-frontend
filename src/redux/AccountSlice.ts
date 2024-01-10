import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AccountState = {
  token: string;
  id: string;
};

// TODO: Check token from local storage first
let token = localStorage.getItem("token");
let id = localStorage.getItem("id");
const initialState: AccountState = {
  id: id === null ? "" : id,
  token: token === null ? "" : token,
};

export const JwtTokenState = createSlice({
  name: "jwtToken",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", state.token);
    },
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
      localStorage.setItem("id", state.id);
    },
    clearToken: (state) => {
      state.token = "";
      localStorage.removeItem("token");
    },
    clearId: (state) => {
      state.id = "";
      localStorage.removeItem("id");
    },
  },
});

export const { setToken, clearToken, setId, clearId } = JwtTokenState.actions;
export default JwtTokenState.reducer;