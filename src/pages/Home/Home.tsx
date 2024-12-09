import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dbModule } from "../../db";
import { auth, authModule } from "../../firebase";
import { PostForm } from "./PostForm";
import { Posts } from "./Posts";

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const [posts, setPosts] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }

      setLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log(loading, user);
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, navigate, user]);

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
        {user?.email && <h4>Welcome: {user?.email}</h4>}

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
