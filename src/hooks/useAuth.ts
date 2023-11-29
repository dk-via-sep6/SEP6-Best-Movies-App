// src/hooks/useAuth.ts

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously as firebaseSignInAnonymously,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { deleteUser as firebaseDeleteUser } from "firebase/auth";
// Example implementations in authServices.ts (or wherever your auth functions are)

export const login = async (email: string, password: string): Promise<void> => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const signUp = async (
  email: string,
  password: string
): Promise<void> => {
  await createUserWithEmailAndPassword(auth, email, password);
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
  // Assuming 'auth' is the Firebase auth instance and currentUser is the current user
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
