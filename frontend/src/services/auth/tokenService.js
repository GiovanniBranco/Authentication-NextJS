import nookies from "nookies";

const ACCESS_TOKEN_KEY = "da45d07e9b040bddfab0d16808804435acd752fa";

export const TokenService = {
  save(accessToken, context = null) {
    nookies.set(context, ACCESS_TOKEN_KEY, accessToken, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
  },

  get(context = null) {
    return nookies.get(context)[ACCESS_TOKEN_KEY];
  },

  remove(context = null) {
    nookies.destroy(context, ACCESS_TOKEN_KEY);
  },
};
