import { AccountModel, UserModel } from "../../domain/models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: AccountModel = {
 
  user: undefined,
} as any;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuthStore: (state, action: PayloadAction<UserModel>) => {
      state.user = action.payload;
    },

    removeAuthStore: (state) => {
      state.user = undefined as any;
    },
  },
});

export const { addAuthStore, removeAuthStore } = authSlice.actions;
export const authReducer = authSlice.reducer;
