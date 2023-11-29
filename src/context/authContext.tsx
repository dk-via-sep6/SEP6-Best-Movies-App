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
}

const defaultAuthContext: AuthContextType = {
  currentUser: null,
  isAnonymous: false,
  loading: true,

  login: async () => {}, // Provide a default no-op async function
  signUp: async () => {},
  logout: async () => {},
  deleteUser: async () => {},
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
  // Provide the current state and functions to the context
  const value = {
    currentUser,
    isAnonymous,
    loading,
    login,
    signUp,
    logout,
    deleteUser,
  };

  // Render the context provider with the state and functions
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
