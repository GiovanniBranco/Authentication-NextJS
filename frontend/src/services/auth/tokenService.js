import nookies from "nookies";

const ACCESS_TOKEN_KEY = "da45d07e9b040bddfab0d16808804435acd752fa";
const REFRESH_TOKEN_KEY = "600bc247984eb072f3aa042bbec1ac83c78fc9e4";

export const TokenService = {
  save(accessToken, context = null) {
    nookies.set(context, ACCESS_TOKEN_KEY, accessToken, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
  },

  saveRefreshToken(refreshToken, context = null) {
    nookies.set(context, REFRESH_TOKEN_KEY, refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
  },

  get(context = null) {
    return nookies.get(context)[ACCESS_TOKEN_KEY];
  },

  getRefreshToken(context = null) {
    return nookies.get(context)[REFRESH_TOKEN_KEY];
  },

  remove(context = null) {
    nookies.destroy(context, ACCESS_TOKEN_KEY);
  },

  removeRefreshToken(context = null) {
    nookies.destroy(context, REFRESH_TOKEN_KEY, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
  },
};
