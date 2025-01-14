import { use } from "react";
import { HttpClient } from "../../infra/httpClient/httpClient";
import { TokenService } from "./tokenService";

export const AuthService = {
  async login(values) {
    try {
      const result = await HttpClient("/login", {
        method: "POST",
        body: values,
        useDefaultUrl: true,
        refresh: false,
      });

      const accessToken = result.data.access_token;
      const refreshToken = result.data.refresh_token;

      if (accessToken) TokenService.save(result.data.access_token);

      if (refreshToken) {
        await HttpClient("/api/refreshToken", {
          method: "POST",
          headers: {
            refresh_token: `${refreshToken}`,
          },
          useDefaultUrl: false,
          refresh: true,
        });
      }
    } catch (error) {
      alert("Username or Password is incorrect");
    }
  },

  async getSession(context = null) {
    const token = TokenService.get(context);

    return await HttpClient("/session", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      useDefaultUrl: true,
      refresh: true,
      context,
    }).then((response) => {
      return response.data;
    });
  },
};
