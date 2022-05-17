import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AuthUserResponse } from "../../utils/api/types";
import { AppState } from "../store";

export interface UserState {
  data: AuthUserResponse | null;
}
const initialState: UserState = {
  data: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (
      state: Draft<UserState>,
      action: PayloadAction<AuthUserResponse>
    ) => {
      state.data = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.data = action.payload.user.data;
    },
  },
});

export const { setUserData } = userSlice.actions;

export const selectUserData = (state: AppState) => state.user.data;

export const userReducer = userSlice.reducer;
