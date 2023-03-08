import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from './root-reducer';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const store = configureStore(
  {
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware().concat(thunk)
  }
);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export default store;