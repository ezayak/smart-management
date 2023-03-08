export const USER_ACTION_TYPES = {
    SET_USER: 'SET_USER',
    SET_LOADING: 'SET_LOADING',
    CHECK_USER_SESSION: 'CHECK_USER_SESSION',
    SIGN_OUT: 'SIGN_OUT',
    SET_ERROR: 'SET_ERROR',
    SET_SUCCESS: 'SET_SUCCESS'
};

export interface User {
    phone: string;
    firstName: string;
    email: string;
    
}

export interface AuthState {
    user: User | null;
    authenticated: boolean;
    loading: boolean;
    error: string;
    success: string;
}

export interface SignInData {
    phone: string;
    password: string;
}

interface SetUserAction {
    type: typeof USER_ACTION_TYPES.SET_USER;
    payload: User;
}

interface SetLoadingAction {
    type: typeof USER_ACTION_TYPES.SET_LOADING;
    payload: boolean;
}

interface SignOutAction {
    type: typeof USER_ACTION_TYPES.SIGN_OUT;
    payload: null;
}

interface CheckUserAction {
    type: typeof USER_ACTION_TYPES.CHECK_USER_SESSION;
    payload: null;
}

interface SetSuccessAction {
    type: typeof USER_ACTION_TYPES.SET_SUCCESS;
    payload: string;
}

interface SetErrorAction {
    type: typeof USER_ACTION_TYPES.SET_ERROR;
    payload: string;
}

export type AuthAction = SetUserAction | CheckUserAction | SetLoadingAction | SignOutAction | SetErrorAction | SetSuccessAction;