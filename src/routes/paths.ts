// ----------------------------------------------------------------------
import { _id } from 'src/_mock/assets';

const MOCK_ID = _id[1];

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  HOME:'/home',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    b2c:{
      login: `${ROOTS.AUTH}/b2c/login`,
      code: `${ROOTS.AUTH}/b2c/code`,
      register: `${ROOTS.AUTH}/b2c/register`,
    }
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.HOME,
    orders: `${ROOTS.HOME}/orders`,
    three: `${ROOTS.HOME}/three`,

    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      list: `${ROOTS.DASHBOARD}/user/list`,
      cards: `${ROOTS.DASHBOARD}/user/cards`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/user/${MOCK_ID}/edit`,
      },
    },
    invoice: {
      root: `${ROOTS.DASHBOARD}/invoice`,
      new: `${ROOTS.DASHBOARD}/invoice/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/invoice/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/invoice/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}/edit`,
      },
    }
  },
};
