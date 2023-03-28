import { User } from "firebase/auth";
import { AdditionalInformation, UserData } from "../../utils/firebase.utils";
import { Action, ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { USER_TYPES } from "./user.types";

type CheckUserSession =  Action<USER_TYPES.CHECK_USER_SESSION>

type SetCurrentUser = ActionWithPayload<USER_TYPES.ADD_CURRENT_REDUCER, UserData>

type GoogleSignInStart = Action<USER_TYPES.GOOGLE_SIGNIN_START>

export type EmailSignInStart = ActionWithPayload<USER_TYPES.EMAIL_SIGNIN_START, { email: string, password: string }>

type SignInSuccess = ActionWithPayload<USER_TYPES.SIGNIN_SUCCESS, UserData>

export type SignUpSuccess = ActionWithPayload<USER_TYPES.SIGNUP_SUCCESS, {user: User, additionalInfo: AdditionalInformation}>

type SignInFailed = ActionWithPayload<USER_TYPES.SIGNIN_FAILED, Error>

type SignUpFailed = ActionWithPayload<USER_TYPES.SIGNUP_FAILED, Error>

export type SignUpStart = ActionWithPayload<USER_TYPES.SIGNUP_START, {email: string, password: string, displayName: string}>

export const checkUserSession = withMatcher((): CheckUserSession =>
  createAction(USER_TYPES.CHECK_USER_SESSION));

export const setCurrentUser = withMatcher((user: UserData):SetCurrentUser => {
  return createAction(USER_TYPES.ADD_CURRENT_REDUCER, user);
});



export const googleSignInStart = withMatcher((): GoogleSignInStart =>
  createAction(USER_TYPES.GOOGLE_SIGNIN_START));

export const emailSignInStart = withMatcher((email: string, password: string): EmailSignInStart =>
  createAction(USER_TYPES.EMAIL_SIGNIN_START, { email, password }));

export const signInSuccess = withMatcher((user: UserData & {id: string}): SignInSuccess =>
  createAction(USER_TYPES.SIGNIN_SUCCESS, user));

export const signInFailed = withMatcher((error: Error): SignInFailed =>
  createAction(USER_TYPES.SIGNIN_FAILED, error));

export const signUpStart = withMatcher((email: string, password: string, displayName: string): SignUpStart =>
  createAction(USER_TYPES.SIGNUP_START, { email, password, displayName }));

export const signUpSuccess = withMatcher((user: User, additionalInfo: AdditionalInformation):SignUpSuccess =>
  createAction(USER_TYPES.SIGNUP_SUCCESS, { user, additionalInfo }));

export const signUpFailed = withMatcher((error: Error):SignUpFailed =>
  createAction(USER_TYPES.SIGNUP_FAILED, error));
