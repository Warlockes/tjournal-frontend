import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { CommentItem } from "../../utils/api/types";
import { AppState } from "../store";

export interface CommentState {
  data: CommentItem | null;
}

const initialState: CommentState = {
  data: null,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setCommentData: (
      state: Draft<CommentState>,
      action: PayloadAction<CommentItem>
    ) => {
      state.data = action.payload;
    },
  },
});

export const { setCommentData } = commentSlice.actions;

export const selectCommentData = (state: AppState) => state.comment.data;

export const commentReducer = commentSlice.reducer;
