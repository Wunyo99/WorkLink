import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("creating user")
  const handleSignUp = async (
    firstname,
    lastname,
    email,
    phone,
    job,
    password,
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log("user Created")
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstname,
        lastname,
        email,
        phone,
        job,
        createdAt: new Date(),
      });
      console.log(user);
      return user;
    } catch (error) {
      console.log(error.message);

      throw error;
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged Out");
    } catch (error) {
      toast.error("Logout Failed");
    }
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubcribe;
  }, []);

  const ctxValue = {
    user,
    loading,
    handleLogin,
    handleSignUp,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
