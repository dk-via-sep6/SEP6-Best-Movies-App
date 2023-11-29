// src/context/AuthContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase/firebase"; // adjust the path as needed
import { deleteUser as firebaseDeleteUser } from "firebase/auth";
// ... other imports

// Define the shape of your context data
interface AuthContextType {
  currentUser: User | null;
  isAnonymous: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  deleteUser: () => Promise<void>;
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
  updateUserEmail: (newEmail: string) => Promise<void>;
  updateUserPassword: (newPassword: string) => Promise<void>;
  reAuthenticate: (email: string, password: string) => Promise<void>;
}

const defaultAuthContext: AuthContextType = {
  currentUser: null,
  isAnonymous: false,
  loading: true,

  login: async () => {}, // Provide a default no-op async function
  signUp: async () => {},
  logout: async () => {},
  deleteUser: async () => {},
  updateUserProfile: async () => {},
  updateUserEmail: async () => {},
  updateUserPassword: async () => {},
  reAuthenticate: async () => {},
};
// Create the context with a default value that matches the shape
export const AuthContext = createContext<AuthContextType>(defaultAuthContext!);

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Props type for the provider component
type Props = {
  children: ReactNode;
};

// Provider component
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAnonymous(user ? user.providerData.length === 0 : false);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Implement the login function
  const login = async (email: string, password: string): Promise<void> => {
    // Call the login function from your authServices and return the promise
    await signInWithEmailAndPassword(auth, email, password);
  };

  // Implement the signUp function
  const signUp = async (email: string, password: string): Promise<void> => {
    // Call the signUp function from your authServices and return the promise
    await createUserWithEmailAndPassword(auth, email, password);
  };

  // Implement the logout function
  const logout = async (): Promise<void> => {
    await signOut(auth);
    // Call the logout function from your authServices and return the promise
  };

  const deleteUser = async (): Promise<void> => {
    if (auth.currentUser) {
      try {
        await firebaseDeleteUser(auth.currentUser);
        // Optionally, handle any post-deletion logic here
        // e.g., logging out the user, redirecting, showing a message, etc.
      } catch (error) {
        // Handle any errors that occur during deletion
        console.error("Error deleting account: ", error);
        throw error; // Re-throw the error if needed
      }
    }
  };

  const updateUserProfile = async (
    displayName: string,
    photoURL?: string
  ): Promise<void> => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: photoURL || auth.currentUser.photoURL, // Keep existing photoURL if not provided
      });
    }
  };

  const updateUserEmail = async (newEmail: string): Promise<void> => {
    if (auth.currentUser) {
      await updateEmail(auth.currentUser, newEmail);
      await sendEmailVerification(auth.currentUser);
    }
  };
  const updateUserPassword = async (newPassword: string): Promise<void> => {
    if (auth.currentUser) {
      await updatePassword(auth.currentUser, newPassword);
    }
  };
  // Inside AuthProvider component

  const reAuthenticate = async (
    email: string,
    password: string
  ): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // Provide the current state and functions to the context
  const value = {
    currentUser,
    isAnonymous,
    loading,
    login,
    signUp,
    logout,
    deleteUser,
    updateUserProfile, // Add this
    updateUserEmail,
    updateUserPassword,
    reAuthenticate,
  };

  // Render the context provider with the state and functions
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
