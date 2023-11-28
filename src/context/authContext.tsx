// src/context/AuthContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase"; // adjust the path as needed

// Define the shape of your context data
interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create the context with a default value that matches the shape
export const AuthContext = createContext<AuthContextType>(null!);

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Props type for the provider component
type Props = {
  children: ReactNode;
};

// Provider component
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Implement the login function
  const login = async (email: string, password: string): Promise<void> => {
    // Call the login function from your authServices and return the promise
  };

  // Implement the signUp function
  const signUp = async (email: string, password: string): Promise<void> => {
    // Call the signUp function from your authServices and return the promise
  };

  // Implement the logout function
  const logout = async (): Promise<void> => {
    // Call the logout function from your authServices and return the promise
  };

  // Provide the current state and functions to the context
  const value = {
    currentUser,
    login,
    signUp,
    logout,
  };

  // Render the context provider with the state and functions
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
