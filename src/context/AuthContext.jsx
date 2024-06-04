import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getAuth } from "firebase/auth";

// create context
export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);

  const auth = getAuth();
  const googleAuthProvider = new GoogleAuthProvider();

  //   create user with email and password
  const createUser = (email, password) => {
    setloading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user with email and password
  const logIn = (email, password) => {
    setloading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   logout the user
  const logOut = () => {
    setloading(true);
    return signOut(auth);
  };

  // create user with google
  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleAuthProvider);
  };

  const userInfo = {
    createUser,
    logIn,
    logOut,
    loginWithGoogle,
    user,
    loading,
  };

  useEffect(() => {
    // observe user's state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setloading(false);
    });

    // stop ovserver
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
}
