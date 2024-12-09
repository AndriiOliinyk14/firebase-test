import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const postCollectionRef = collection(db, "posts");

const getPosts = async () => {
  try {
    const response = await getDocs(postCollectionRef);

    const data = response.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    return data;
  } catch (error) {
    console.log(`getPosts || ${error}`);
  }
};

const addPost = async (title: string, description: string) => {
  try {
    const response = await addDoc(postCollectionRef, { title, description });
    return response;
  } catch (error) {
    console.log(`addPost || ${error}`);
  }
};

export const dbModule = {
  getPosts,
  addPost,
};
