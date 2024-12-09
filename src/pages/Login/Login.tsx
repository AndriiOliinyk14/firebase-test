import { ChangeEvent, useState } from "react";
import { authModule } from "../../firebase";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleOnChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onRedirect = (path: string) => {
    navigate(path);
  };

  const onLogin = async () => {
    if (!email) {
      alert("Enter email");
      return;
    }

    if (!password) {
      alert("Enter password");
      return;
    }

    const response = await authModule.signIn(email, password);

    if (response?.email) {
      onRedirect("/");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={handleOnChangeEmail}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={handleOnChangePassword}
      />
      <button onClick={onLogin}>Log In</button>
      <button onClick={() => onRedirect("/register")}>
        Create new account
      </button>
    </div>
  );
};
