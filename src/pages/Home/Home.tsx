import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dbModule } from "../../db";
import { authModule } from "../../firebase";
import { PostForm } from "./PostForm";
import { Posts } from "./Posts";

export const Home = () => {
  const [posts, setPosts] = useState<any>([]);
  const navigate = useNavigate();

  const info = authModule.getUserDataFromLocalStorage();

  useEffect(() => {
    if (!info) {
      navigate("/login");
    }
  }, [info, navigate]);

  const getPosts = async () => {
    const data = await dbModule.getPosts();
    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleLogOut = async () => {
    await authModule.logOut();
    navigate("/login");
  };

  const onAddPost = () => {
    getPosts();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "49px",
        width: "600px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <h4>Welcome: {info?.email}</h4>

        <button onClick={handleLogOut}>Log out</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <h4>Add new post</h4>
        <PostForm onSuccess={onAddPost} />
      </div>
      <div>
        <h4>Top 10 Posts:</h4>

        <Posts data={posts} />
      </div>
    </div>
  );
};
