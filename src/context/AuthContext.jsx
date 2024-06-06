import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { getAuth } from "firebase/auth";

import { app } from "../firebase/firebase.config";
import useAxiosInstance from "../hooks/useAxiosInstance";

// create context
export const AuthContext = createContext(null);

const auth = getAuth(app);

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);
  const googleAuthProvider = new GoogleAuthProvider();

  const axiosInstace = useAxiosInstance();

  //   create user with email and password
  const createUser = (email, password) => {
    setloading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update user profile
  const updateUserProfile = (name, photo) => {
    setloading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
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
    setloading(true);
    return signInWithPopup(auth, googleAuthProvider);
  };

  const userInfo = {
    createUser,
    logIn,
    logOut,
    loginWithGoogle,
    updateUserProfile,
    user,
    loading,
  };

  useEffect(() => {
    // observe user's state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // get token and set to the client
      if (currentUser) {
        axiosInstace.post("jwt", { email: currentUser.email }).then((res) => {
          if (res.data.token) {
            // if token exist in response then set it localstorage
            localStorage.setItem("access-token", res.data.token);

            setloading(false);
          }
        });
      } else {
        // if user does not exist/logout then remove token from localstorage
        localStorage.removeItem("access-token");
        setloading(false);
      }
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
