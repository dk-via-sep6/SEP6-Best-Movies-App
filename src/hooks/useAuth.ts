import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously as firebaseSignInAnonymously,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { deleteUser as firebaseDeleteUser } from "firebase/auth";

export const login = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error: any) {
    console.error("Login Error:", error);
    throw error;
  }
};

export const signUp = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  const response = await createUserWithEmailAndPassword(auth, email, password);
  return response;
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};

export const signInWithGoogle = async (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

export const signInAnonymously = async (): Promise<void> => {
  await firebaseSignInAnonymously(auth);
};
export const deleteUser = async (): Promise<void> => {
  if (auth.currentUser) {
    await firebaseDeleteUser(auth.currentUser);
  }
};
export const updateUserProfile = async (
  displayName: string,
  photoURL: string
): Promise<void> => {
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName, photoURL });
  }
};
