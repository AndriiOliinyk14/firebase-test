import { FC } from "react";

interface PostsProps {
  data: any[];
}

export const Posts: FC<PostsProps> = ({ data }) => {
  return (
    <ul>
      {data?.map((post) => {
        return (
          <li style={{ textAlign: "left" }}>
            <p>
              <strong>Title:</strong> {post.title}
            </p>

            <p>
              <strong>Description:</strong> {post.description}
            </p>
          </li>
        );
      })}
    </ul>
  );
};
