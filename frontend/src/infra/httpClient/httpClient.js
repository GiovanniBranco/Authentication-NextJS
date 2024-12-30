import { TokenService } from "../../services/auth/tokenService";

const DEFAULT_URL = process.env.NEXT_PUBLIC_URL_BACKEND_DEFAULT;

export const HttpClient = async (
  url,
  options,
  useDefaultUrl = true,
  refresh = false
) => {
  return fetch(`${useDefaultUrl ? DEFAULT_URL : ""}/${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : null,
  }).then(async (response) => {
    if (response.status === 401 && !refresh) throw new Error("Unauthorized");

    if (response.status === 401 && refresh) {
      const newAccess = await HttpClient(
        "api/refreshToken",
        {
          method: "GET",
        },
        false,
        false
      );

      const modifiedOption = {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newAccess.data.access_token}`,
        },
      };

      const retryResponse = await HttpClient(url, modifiedOption, true, false);

      return retryResponse;
    }

    if (!response.ok) throw new Error("Internal server error");

    const body = await response.json();

    return body;
  });
};
