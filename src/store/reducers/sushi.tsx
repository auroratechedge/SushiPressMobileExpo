import { createReducer } from "@reduxjs/toolkit";
import { addRemovePeople, addToCart, getItems, getListMenu, sendOrder } from "../actions/sushi";

export type LayoutState = {
  loading: boolean;
  listMenu: any;
  items: any;
  cart: any;
  people: number;
  send: boolean;
};

const initialState: LayoutState = {
    listMenu: [],
    loading: false,
    items: [],
    cart: [],
    people: 0,
    send: false,
};

export default createReducer(initialState, (builder) => {
  builder
  .addCase(getListMenu.fulfilled, (state, actions) => {
    state.listMenu = actions.payload;
    state.loading = false;
  })
  .addCase(getListMenu.pending, (state) => {
    state.loading = true;
  })
  .addCase(getListMenu.rejected, (state) => {
    state.listMenu = null;
    state.loading = false;
  })
  .addCase(getItems.fulfilled, (state, actions) => {
    state.items = actions.payload.find((option: any) => option.id === actions.meta.arg).items;
    state.loading = false;
  })
  .addCase(getItems.pending, (state) => {
    state.loading = true;
  })
  .addCase(getItems.rejected, (state) => {
    state.items = null;
    state.loading = false;
  })
  .addCase(addToCart, (state, action) => {
    if (action.payload.mode === 'update') {
      state.cart.find((el: any) => el.id === action.payload.cart.id).quantity = action.payload.cart.quantity
    } else if (action.payload.mode === 'add') {
      state.cart = [...state.cart, action.payload.cart]
    } else if (action.payload.mode === 'delete') {
      state.cart.splice(state.cart.findIndex((el: any) => el.id === action.payload.cart.id), 1)
    } else if (action.payload.mode === 'deleteAll') {
      state.cart = []
    }
  })
  .addCase(addRemovePeople, (state, action) => {
    state.people = action.payload
  })
  .addCase(sendOrder, (state, action) => {
    state.send = action.payload
    state.loading = false
  })
});
