import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const collectionName = "posts";
const postsCollectionRef = collection(db, collectionName);

const getPosts = async () => {
  const q = query(postsCollectionRef, orderBy("createdAt", "desc"), limit(10));

  try {
    const response = await getDocs(q);

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
    const response = await addDoc(postsCollectionRef, {
      title,
      description,
      createdAt: Timestamp.now(),
    });
    return response;
  } catch (error) {
    console.log(`addPost || ${error}`);
  }
};

export const dbModule = {
  getPosts,
  addPost,
};
