import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import * as loadingActions from './loading';
import axios from 'axios';

const mock = [
  {
    "id": 1,
    "category": "Hosomaki",
    "items": [
      {
        "id": "1a",
        "img": "https://www.planetsushi.hu/wp-content/uploads/avocado_maki.jpg",
        "name": "Avocado Maki",
        "price": 4
      },
      {
        "id": "2a",
        "img": "https://www.planetsushi.hu/wp-content/uploads/maki-kunsei.jpg",
        "name": "Kunsei Maki",
        "price": 5.2
      },
      {
        "id": "3a",
        "img": "https://www.planetsushi.hu/wp-content/uploads/sake_maki.jpg",
        "name": "Sake Maki",
        "price": 4.5
      },
      {
        "id": "4a",
        "img": "https://www.planetsushi.hu/wp-content/uploads/tekka_maki-400x400.jpg",
        "name": "Tekka Maki",
        "price": 4.5
      },
      {
        "id": "5a",
        "img": "https://www.planetsushi.hu/wp-content/uploads/sensei_maki.jpg",
        "name": "Sensei Maki",
        "price": 5.5
      }
    ]
  },
  {
    "id": 2,
    "category": "Soups",
    "items": [
      {
        "id": "1b",
        "img": "https://www.planetsushi.hu/wp-content/uploads/miso-ebi-400x400.jpg",
        "name": "Ebi Miso",
        "price": 4
      },
      {
        "id": "2b",
        "img": "https://www.planetsushi.hu/wp-content/uploads/Edamame-Cream-Soup-400x400.jpg",
        "name": "Edamame Cream Soup",
        "price": 5
      },
      {
        "id": "3b",
        "img": "https://www.planetsushi.hu/wp-content/uploads/Laksa-1-400x400.jpg",
        "name": "Laksa",
        "price": 6.5
      },
      {
        "id": "4b",
        "img": "https://www.planetsushi.hu/wp-content/uploads/nabe-udon-400x400.jpg",
        "name": "Nabe Udon",
        "price": 7
      },
      {
        "id": "5b",
        "img": "https://www.planetsushi.hu/wp-content/uploads/miso-shiro-400x400.jpg",
        "name": "Miso Shiro",
        "price": 3
      }
    ] 
  },
  {
    "id": 3,
    "category": "Salads",
    "items": [
      {
        "id": "1c",
        "img": "https://www.planetsushi.hu/wp-content/uploads/Chukka-salata-400x400.jpg",
        "name": "Chukka",
        "price": 2.5
      },
      {
        "id": "2c",
        "img": "https://www.planetsushi.hu/wp-content/uploads/Ebi-Amai-400x400.jpg",
        "name": "Ebi Amai",
        "price": 5.5
      },
      {
        "id": "3c",
        "img": "https://www.planetsushi.hu/wp-content/uploads/Edamame-400x400.jpg",
        "name": "Edamame",
        "price": 2.5
      }
    ] 
  },
  {
    "id": 4,
    "category": "Uramaki",
    "items": [
      {
        "id": "1d",
        "img": "https://www.planetsushi.hu/wp-content/uploads/maki-california-400x400.jpg",
        "name": "California Maki",
        "price": 7.5
      },
      {
        "id": "2d",
        "img": "https://www.planetsushi.hu/wp-content/uploads/maki-ebi-cruch-400x400.jpg",
        "name": "Ebi Crunch Maki",
        "price": 9.5
      },
      {
        "id": "3d",
        "img": "https://www.planetsushi.hu/wp-content/uploads/maki-horenso-400x400.jpg",
        "name": "Horenso Maki",
        "price": 11.5
      },
      {
        "id": "4d",
        "img": "https://www.planetsushi.hu/wp-content/uploads/maki-maguro-400x400.jpg",
        "name": "Maguro Maki",
        "price": 6.5
      },
      {
        "id": "5d",
        "img": "https://www.planetsushi.hu/wp-content/uploads/maki-philadelphia-400x400.jpg",
        "name": "Philadelphia Maki",
        "price": 7.2
      },
      {
        "id": "6d",
        "img": "https://www.planetsushi.hu/wp-content/uploads/maki-wasabiko-400x400.jpg",
        "name": "Wasabiko Maki",
        "price": 5.5
      }
    ] 
  },
  {
    "id": 5,
    "category": "Sashimi",
    "items": [
      {
        "id": "1e",
        "img": "https://www.planetsushi.hu/wp-content/uploads/sake-sashimi-400x400.jpg",
        "name": "Sake",
        "price": 5.5
      },
      {
        "id": "2e",
        "img": "https://www.planetsushi.hu/wp-content/uploads/ume-set-400x400.jpg",
        "name": "Ume Set",
        "price": 6
      },
      {
        "id": "3e",
        "img": "https://www.planetsushi.hu/wp-content/uploads/unagi-sashimi-400x400.jpg",
        "name": "Unagi",
        "price": 4.5
      }
    ] 
  },
  {
    "id": 6,
    "category": "Appetizers",
    "items": [
      {
        "id": "1f",
        "img": "https://www.planetsushi.hu/wp-content/uploads/Ebi-tempura-400x400.jpg",
        "name": "Ebi Tempura",
        "price": 3.5
      },
      {
        "id": "2f",
        "img": "https://www.planetsushi.hu/wp-content/uploads/vegie-tempura-400x400.jpg",
        "name": "Yasai Tempura",
        "price": 3.9
      },
      {
        "id": "3f",
        "img": "https://www.planetsushi.hu/wp-content/uploads/3db-gyoza-400x400.jpg",
        "name": "Gyoza",
        "price": 6.5
      },
      {
        "id": "4f",
        "img": "https://www.haiku-restaurant.it/images/virtuemart/product/tartare/tartare_salmone_menu_giapponese.jpg",
        "name": "Sake Tartare",
        "price": 6.5
      },
      {
        "id": "5f",
        "img": "https://www.haiku-restaurant.it/images/virtuemart/product/tartare/tartare_tonno_menu_giapponese.jpg",
        "name": "Tuna Tartare",
        "price": 5.7
      }
    ] 
  },
  {
    "id": 7,
    "category": "Nigiri",
    "items": [
      {
        "id": "1g",
        "img": "https://www.planetsushi.hu/wp-content/uploads/ebi-nigiri-1-400x400.jpg",
        "name": "Ebi",
        "price": 3.5
      },
      {
        "id": "2g",
        "img": "https://www.planetsushi.hu/wp-content/uploads/sake-nigiri-1-400x400.jpg",
        "name": "Sake",
        "price": 4.5
      },
      {
        "id": "4g",
        "img": "https://www.planetsushi.hu/wp-content/uploads/Tamago-nigiri-1-400x400.jpg",
        "name": "Tako",
        "price": 2.9
      }
    ] 
  },
  {
    "id": 8,
    "category": "Drinks",
    "items": [
      {
        "id": "1h",
        "img": "https://www.planetsushi.hu/wp-content/uploads/w_asahi1-400x400.jpg",
        "name": "Asahi",
        "price": 5
      },
      {
        "id": "2h",
        "img": "https://www.planetsushi.hu/wp-content/uploads/w_NaturAqua_still_15PET_2014-400x400.jpg",
        "name": "Mineral Water",
        "price": 1.5
      },
      {
        "id": "3h",
        "img": "https://tokyostore.it/3160-large_default/sake-giapponese-720ml-tamanohikari-junmai-ginjo-tokusen-sake.jpg",
        "name": "Sake",
        "price": 4
      }
    ] 
  }
]

export const getListMenu = createAsyncThunk<any, void>(
  'getListMenu',
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(loadingActions.startLayoutLoading());
      //const {data} = await axios.post('http://10.0.2.2:3002/listmenu');
      const data = mock;
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
      //const {data} = await axios.post('http://10.0.2.2:3002/listmenu', idMenu);
      const data = mock;
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

