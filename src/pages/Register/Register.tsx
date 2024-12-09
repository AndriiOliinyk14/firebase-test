import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authModule } from "../../firebase";

export const Register = () => {
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

  const onRegister = async () => {
    if (!email) {
      alert("Enter email");
      return;
    }

    if (!password) {
      alert("Enter password");
      return;
    }

    const response = await authModule.signUp(email, password);

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
      <button onClick={onRegister}>Register</button>
      <button onClick={() => onRedirect("/login")}>
        Already has an account
      </button>
    </div>
  );
};
