import { User } from "firebase/auth";
import { takeLatest, put, all, call } from "typed-redux-saga/macro";
import {
  AdditionalInformation,
  connectDBwithFirestore,
  createUserProfieWithEmailPassword,
  getCurrentUser,
  signInUserProfieWithEmailPassword,
  signInWithGooglePopup,
} from "../../utils/firebase.utils";
import {
  signInFailed,
  signInSuccess,
  signUpFailed,
  signUpSuccess,
  EmailSignInStart,
  SignUpStart,
  SignUpSuccess
} from "./user.action";
import { USER_TYPES } from "./user.types";

export function* getSnapShotFromUser(userAuth: User, additionalInfo?: AdditionalInformation) {
  try {
    const snapShot = yield* call(
      connectDBwithFirestore,
      userAuth,
      additionalInfo
    );
    if (snapShot) {
      yield put(signInSuccess({ id: snapShot.id, ...snapShot.data() }));
      
    }
  } catch (error) {
    yield put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const getAuth = yield* call(getCurrentUser);
    if (!getAuth) return;
    yield* call(getSnapShotFromUser, getAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signinWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapShotFromUser, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* siginInEmailPassword({ payload: { email, password } }:EmailSignInStart) {
  try {
    const userCredential = yield* call(
      signInUserProfieWithEmailPassword,
      email,
      password
    );
    if (userCredential) {
      const { user }  = userCredential
      yield* call(getSnapShotFromUser, user);
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signUp({ payload: { email, password, displayName } }: SignUpStart) {
  try {
    const userCredential = yield* call(
      createUserProfieWithEmailPassword,
      email,
      password
    );
    if (userCredential) {
      const { user } = userCredential
      yield* put(signUpSuccess(user, {displayName}));
    }
  } catch (error) {
    yield* put(signUpFailed(error as Error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalInfo } }: SignUpSuccess) {
  yield* call(getSnapShotFromUser, user, additionalInfo);
}

export function* onsignUpStart() {
  yield* takeLatest(USER_TYPES.SIGNUP_START, signUp);
}

export function* signInAfterSuccess() {
  yield* takeLatest(USER_TYPES.SIGNUP_SUCCESS, signInAfterSignUp);
}

export function* onEmailPasswordSignIn() {
  yield* takeLatest(USER_TYPES.EMAIL_SIGNIN_START, siginInEmailPassword);
}

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_TYPES.GOOGLE_SIGNIN_START, signinWithGoogle);
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailPasswordSignIn),
    call(onsignUpStart),
    call(signInAfterSuccess),
  ]);
}
