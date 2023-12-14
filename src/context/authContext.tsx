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
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { deleteUser as firebaseDeleteUser } from "firebase/auth";
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
  sendForgotPasswordEmail: (email: string) => Promise<void>;
}

const defaultAuthContext: AuthContextType = {
  currentUser: null,
  isAnonymous: false,
  loading: true,

  login: async () => {},
  signUp: async () => {},
  logout: async () => {},
  deleteUser: async () => {},
  updateUserProfile: async () => {},
  updateUserEmail: async () => {},
  updateUserPassword: async () => {},
  reAuthenticate: async () => {},
  sendForgotPasswordEmail: async () => {},
};
export const AuthContext = createContext<AuthContextType>(defaultAuthContext!);

export const useAuth = () => useContext(AuthContext);

type Props = {
  children: ReactNode;
};

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

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string): Promise<void> => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  const deleteUser = async (): Promise<void> => {
    if (auth.currentUser) {
      try {
        await firebaseDeleteUser(auth.currentUser);
      } catch (error) {
        console.error("Error deleting account: ", error);
        throw error;
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
        photoURL: photoURL || auth.currentUser.photoURL,
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

  const reAuthenticate = async (
    email: string,
    password: string
  ): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const sendForgotPasswordEmail = async (email: string): Promise<void> => {
    if (!email) {
      throw new Error("Email is required.");
    }
    await sendPasswordResetEmail(auth, email);
  };

  const value = {
    currentUser,
    isAnonymous,
    loading,
    login,
    signUp,
    logout,
    deleteUser,
    updateUserProfile,
    updateUserEmail,
    updateUserPassword,
    reAuthenticate,
    sendForgotPasswordEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
