import { useContext, useState } from "react";
import { Context } from "../main";
import './LoginForm.scss'
export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);

  const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    store.login(email, password);
  };

  const handleRegister = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    store.registration(email, password);
  };

  return (
    <div>
        <h1 style={{textAlign:'center'}}>Authorization user</h1>
      <form action="">
        <div className="form_authorization">
          <input type="email" placeholder='email'value={email}onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit" onClick={handleLogin}>Login</button>
          <button type="submit" onClick={handleRegister}>Register</button>
        </div>
      </form>
    </div>
  );
}
