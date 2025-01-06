import { TokenService } from "../../services/auth/tokenService";

const DEFAULT_URL = process.env.NEXT_PUBLIC_URL_BACKEND_DEFAULT;

export const HttpClient = async (url, options) => {
  return fetch(`${options?.useDefaultUrl ? DEFAULT_URL : ""}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : null,
  }).then(async (response) => {
    if (response.status === 401 && !options.refresh)
      throw new Error("Unauthorized");

    if (response.status === 401 && options.refresh) {
      const isServer = options?.context ? true : false;
      const refreshTokenAtual = isServer
        ? TokenService.getRefreshToken(options.context)
        : undefined;

      const newAccess = await HttpClient(
        "http://localhost:3000/api/refreshToken",
        {
          method: "GET",
          headers: {
            refresh_token: refreshTokenAtual,
          },
          useDefaultUrl: false,
          refresh: false,
        }
      );

      if (isServer) {
        TokenService.save(newAccess.data.access_token, options.context);
        TokenService.saveRefreshToken(
          newAccess.data.refresh_token,
          options.context
        );
      }

      const modifiedOption = {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newAccess.data.access_token}`,
        },
        useDefaultUrl: true,
        refresh: false,
      };

      const retryResponse = await HttpClient(url, modifiedOption);

      return retryResponse;
    }

    if (!response.ok) throw new Error("Internal server error");

    const body = await response.json();

    return body;
  });
};
