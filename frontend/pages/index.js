import { useRouter } from "next/router";
import { useState } from "react";
import { AuthService } from "../src/services/auth/authService";

export default function HomeScreen() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await AuthService.login(values);

    router.push(`/auth/auth-page-ssr`);
    // router.push(`/auth/auth-page-static`);
  };

  const router = useRouter();
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          name="username"
          value={values.username}
          onChange={handleChange}
        />
        <input
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        <div>
          <button>Entrar</button>
        </div>
      </form>
    </div>
  );
}
