import { AuthState } from "./user.types";

export const selectUser = (state: AuthState) => state.user;