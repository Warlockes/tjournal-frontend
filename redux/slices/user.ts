import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
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
});

export const { setUserData } = userSlice.actions;

export const selectUserData = (state: AppState) => state.user.data;

export const userReducer = userSlice.reducer;
