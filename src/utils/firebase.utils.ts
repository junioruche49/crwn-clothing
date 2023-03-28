import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver
} from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot
} from "firebase/firestore";
import { Category } from "../store/categories/category.types";

const firebaseConfig = ''

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.getCustomParameters();
// provider.getCustomParameters({
//   prompt: "select_account",
// });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

const db = getFirestore();

type ObjectToAdd = {
  title: string
}

export const addCollectionAndDocuments = async<T extends ObjectToAdd> (
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);

  return querySnapShot.docs.map((docSnapShot) => docSnapShot.data() as Category);
};

export type AdditionalInformation = {
  displayName?: string
}

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string
}

export const connectDBwithFirestore = async (authUser : User, additionalInfo = {} as AdditionalInformation) : Promise<void | QueryDocumentSnapshot<UserData>> => {
  const userDocRef = doc(db, "user", authUser.uid);
  //   console.log(userDocRef);
  const userSnapShot = await getDoc(userDocRef);
  //   console.log(userSnapShot);
  //   console.log(userSnapShot.exists());

  if (!userSnapShot.exists()) {
    const { displayName, email } = authUser;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        email,
        displayName,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("error creating the user", error);
    }
  }
  // return userDocRef;
  return userSnapShot as QueryDocumentSnapshot<UserData>;
};

export const createUserProfieWithEmailPassword = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserProfieWithEmailPassword = async (email: string, password: string) => {
  if (!email || !password) {
    return;
  }
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedHandler = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (authUser) => {
        unsubscribe();
        resolve(authUser);
      },
      reject
    );
  });
};
