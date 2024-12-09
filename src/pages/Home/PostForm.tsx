import { ChangeEvent, FC, useState } from "react";
import { dbModule } from "../../db";

interface PostFormProps {
  onSuccess: () => void;
}

export const PostForm: FC<PostFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleOnAddPost = async () => {
    const response = await dbModule.addPost(title, description);

    if (response) {
      setTitle("");
      setDescription("");
      onSuccess();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <input
        type="text"
        placeholder="title"
        onChange={handleTitle}
        value={title}
      />
      <textarea
        name="descripion"
        placeholder="descripion"
        onChange={handleDescription}
        value={description}
      />
      <button onClick={handleOnAddPost}>Add Post</button>
    </div>
  );
};
