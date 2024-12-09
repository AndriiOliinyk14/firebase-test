import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./config";

export const authKey = "user_info";

const saveUserToLocalStorage = (data: any) => {
  localStorage.setItem(authKey, JSON.stringify(data));
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem(authKey);
};

const getUserDataFromLocalStorage = () => {
  try {
    const userData = localStorage.getItem(authKey);

    if (userData) {
      return JSON.parse(userData);
    }
  } catch (error) {
    console.log(error);
  }
};

const signUp = async (email: string, password: string) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (response.user) {
      saveUserToLocalStorage({
        email: response.user.email,
      });

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
      saveUserToLocalStorage({
        email: response.user.email,
      });

      return response.user;
    }
  } catch (error) {
    console.log(`Auth.signIn || ${error}`);
  }
};

const logOut = async () => {
  try {
    await signOut(auth);
    removeUserFromLocalStorage();
  } catch (error) {
    console.log(`Auth.signIn || ${error}`);
  }
};

export const authModule = {
  signUp,
  signIn,
  logOut,
  getUserDataFromLocalStorage,
};
