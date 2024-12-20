import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./config";

const signUp = async (email: string, password: string) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (response.user) {
      return response.user;
    }
  } catch (error) {
    console.log(`Auth.signUp || ${error}`);
  }
};

const signIn = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);

    if (response.user) {
      return response.user;
    }
  } catch (error) {
    console.log(`Auth.signIn || ${error}`);
  }
};

const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(`Auth.signIn || ${error}`);
  }
};

export const authModule = {
  signUp,
  signIn,
  logOut,
};
