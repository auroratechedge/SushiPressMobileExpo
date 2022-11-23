import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import * as loadingActions from './loading';
import axios from 'axios';

export const getListMenu = createAsyncThunk<any, void>(
  'getListMenu',
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(loadingActions.startLayoutLoading());
      const {data} = await axios.post('http://10.0.2.2:3002/listmenu');
      return data;
    } catch (error) {
      return error;
    } finally {
      thunkApi.dispatch(loadingActions.endLayoutLoading());
    }
  },
);

export const getItems = createAsyncThunk<any, any>(
  'getItems',
  async (idMenu, thunkApi) => {
    try {
      thunkApi.dispatch(loadingActions.startLayoutLoading());
      const {data} = await axios.post('http://10.0.2.2:3002/listmenu', idMenu);
      return data;
    } catch (error) {
      return error;
    } finally {
      thunkApi.dispatch(loadingActions.endLayoutLoading());
    }
  },
);

export const addToCart = createAction(
  'addToCart',
  function prepare(cart: any, mode: string) {
    return {
      payload: {cart, mode},
    }
  },
)

export const addRemovePeople = createAction(
  'addRemovePeople',
  function prepare(people: number) {
    return {
      payload: people,
    }
  },
)

export const sendOrder = createAction(
  'sendOrder',
  function prepare(send: boolean) {
    loadingActions.startLayoutLoading();
    return {
      payload: send,
    }
  },
)

