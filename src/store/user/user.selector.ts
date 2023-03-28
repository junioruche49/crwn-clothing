import { createSelector } from "reselect";
import { RootState } from "../store";
import { UserState } from "./user.reducer";

export const userSelect = (state: RootState):UserState => state.user;

export const userSelector = createSelector([userSelect], (user) => user.currentUser);
