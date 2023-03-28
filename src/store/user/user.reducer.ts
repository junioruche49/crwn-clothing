import { AnyAction } from "redux";
import { UserData } from "../../utils/firebase.utils";
import { signInFailed, signInSuccess, signUpFailed } from "./user.action";

export type UserState = {
  readonly currentUser: UserData | null,
  readonly loading: boolean,
  readonly error: Error | null
}

const initialReducer: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};

export const userReducer = (state = initialReducer, action: AnyAction): UserState => {

  
  if (signInSuccess.match(action)) {
    return  {
      ...state,
      currentUser: action.payload,
    };
  }
  
  if (signInFailed.match(action) || signUpFailed.match(action)) {
    return {
            ...state,
            error: action.payload,
          };
  }
  return state
  // const { type, payload } = action;
  // switch (type) {
  //   case USER_TYPES.SIGNIN_SUCCESS:
  //     return {
  //       ...state,
  //       currentUser: payload,
  //     };
  //   case USER_TYPES.SIGNIN_FAILED:
  //     return {
  //       ...state,
  //       error: payload,
  //     };
  //   default:
  //     return state;
  // }
};
