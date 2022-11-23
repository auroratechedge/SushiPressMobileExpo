import { createReducer } from "@reduxjs/toolkit";
import * as loadingAction from "../actions/loading";

export type LayoutState = {
  loadingCounter: number;
};

const initialState: LayoutState = {
  loadingCounter: 0,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(loadingAction.setLayoutLoadingCounter, (state, action) => {
      state.loadingCounter = action.payload;
    })
    .addCase(loadingAction.startLayoutLoading, (state) => {
      state.loadingCounter += 1;
    })
    .addCase(loadingAction.endLayoutLoading, (state) => {
      state.loadingCounter = Math.max(state.loadingCounter - 1, 0);
    });
});
