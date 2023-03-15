import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { AuthAction, USER_ACTION_TYPES } from './user.types';
import firebase from '../../utils/firebase/firebase';
//import authService from '../../services/security/auth.service';
import { User } from '../../models';

// Set loading
export const setLoading = (
  value: boolean
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: USER_ACTION_TYPES.SET_LOADING,
      payload: value,
    });
  };
};

export const seterror = (
  msg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: USER_ACTION_TYPES.SET_ERROR,
      payload: msg,
    });
  };
};

// export const getUserDataByLogin = (): ThunkAction<
//   void,
//   RootState,
//   null,
//   AuthAction
// > => {
//   return async (dispatch) => {
//     //todo: get data from backend about user
//     const user: User = await authService.login();
//     console.log('user', user);

//     if (user) {
//       dispatch({
//         type: USER_ACTION_TYPES.SET_USER,
//         payload: user,
//       });
//     } else {
//       dispatch({
//         type: USER_ACTION_TYPES.SIGN_OUT,
//         payload: true,
//       });
//       dispatch({
//         type: USER_ACTION_TYPES.SET_ERROR,
//         payload: 'There is no such user',
//       });
//     }
//   };
// };

export const setUserData = (
  user: User
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    if (user) {
      dispatch({
        type: USER_ACTION_TYPES.SET_USER,
        payload: user,
      });
    } else {
      dispatch({
        type: USER_ACTION_TYPES.SIGN_OUT,
        payload: true,
      });
    }
  };
};

export const signout = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await firebase.auth().signOut();
      dispatch({
        type: USER_ACTION_TYPES.SIGN_OUT,
        payload: true,
      });
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    }
  };
};
