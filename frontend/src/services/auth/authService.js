import { HttpClient } from "../../infra/httpClient/httpClient";
import { TokenService } from "./tokenService";

export const AuthService = {
  async login(values) {
    return await HttpClient("login", {
      method: "POST",
      body: values,
    });
  },

  async getSession(context = null) {
    const token = TokenService.get(context);

    return await HttpClient("session", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      return response.data;
    });
  },
};
