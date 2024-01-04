import { useMemo, useEffect, useReducer, useCallback } from 'react';

import axios, { endpoints } from 'src/utils/axios';

import { AuthContext } from './auth-context';
import { useRouter } from "../../../routes/hooks";
import { fPhone } from "../../../utils/format-number";
import { PATH_REGISTER } from "../../../config-global";
import { setSession, setRegistered, setSessionPhone } from './utils';
import { AuthUserType, ActionMapType, AuthStateType } from '../../types';
// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN_PHONE = 'LOGIN_PHONE',
  LOGIN_CODE = 'LOGIN_CODE',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN_PHONE]: {
    phone: string | undefined;
  };
  [Types.LOGIN_CODE]: {
    phone: string | null | undefined;
    code: string | undefined;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN_PHONE) {
    return {
      ...state,
      phone: action.payload.phone,
    };
  }
  if (action.type === Types.LOGIN_CODE) {
    return {
      ...state,
      phone: action.payload.phone,
      code: action.payload.phone,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';
const REGISTERED_KEY = 'registered';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({children}: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const router = useRouter();
  const initialize = useCallback(async () => {

    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);
      const isRegistered = sessionStorage.getItem(REGISTERED_KEY);
      console.log(accessToken, isRegistered)
      if (accessToken && isRegistered === 'true') {
        setSession(accessToken);

        const url = endpoints.auth.me
        const res = await axios.get(url);

        const user = res.data;

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } else if (accessToken && isRegistered === 'false') {
        router.push(PATH_REGISTER);
        setRegistered(null)
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, [router]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const loginPhone = useCallback(async (phone: string | undefined) => {
    const data = {
      phone: fPhone(phone),
    };
    const url = endpoints.auth.login;

    await axios.post(url, data);

    setSessionPhone(phone)

    dispatch({
      type: Types.LOGIN_PHONE,
      payload: {
        phone,
      },
    });
  }, []);

  const loginCode = useCallback(async (code?: string) => {
    const phone = fPhone(sessionStorage.getItem('phone'))
    const data = {
      phone,
      code,
    };

    const url = endpoints.auth.code;
    const res = await axios.post(url, data);

    const {token, userInfo} = res.data;

    setRegistered(userInfo.registered ? 'true' : 'false')
    setSession(token);

    dispatch({
      type: Types.LOGIN_CODE,
      payload: {
        phone,
        code,
      },
    });
    await initialize()
  }, [initialize]);

  const resendCode = useCallback(async () => {
    const phone = fPhone(sessionStorage.getItem('phone'))
    const data = {
      phone,
    };
    const url = endpoints.auth.resendCode;
    const res = await axios.post(url, data);

    console.log(res)

  }, []);


  // REGISTER
  const register = useCallback(
    async (name: string) => {
      const data = {
        name
      };
      const url = endpoints.auth.register;
      await axios.post(url, data);
      setRegistered('true')
      dispatch({
        type: Types.REGISTER,
        payload: {
          user: {},
        },
      });
      await initialize()
    },
    [initialize]
  );

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    setRegistered(null)
    setSessionPhone(undefined)
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'b2c',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      loginPhone,
      loginCode,
      resendCode,
      register,
      logout,
    }),
    [loginPhone, loginCode, resendCode, logout, register, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
