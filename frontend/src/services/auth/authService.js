import { HttpClient } from "../../infra/httpClient/httpClient";

export const AuthService = {
  async login(values) {
    return await HttpClient("login", {
      method: "POST",
      body: JSON.stringify(values),
    });
  },
};
