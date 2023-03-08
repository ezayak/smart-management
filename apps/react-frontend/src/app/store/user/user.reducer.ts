import { AuthAction, USER_ACTION_TYPES, AuthState } from "./user.types";

const initailState: AuthState = {
    user: null,
    authenticated: false,
    loading: false,
    error: '',
    success: ''
};

const userReducer = (state = initailState, action: AuthAction)  => {
    switch (action.type) {
        case USER_ACTION_TYPES.SET_USER:
            return {
                ...state,
                user: action.payload,
                authenticated: true
            };
        case USER_ACTION_TYPES.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case USER_ACTION_TYPES.SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case USER_ACTION_TYPES.SET_SUCCESS:
            return {
                ...state,
                success: action.payload
            }
        case USER_ACTION_TYPES.SIGN_OUT:
            return {
                ...state,
                user: null,
                authenticated: false,
                loading: false
            }
            
        default: return state;
    }    
}

export default userReducer;