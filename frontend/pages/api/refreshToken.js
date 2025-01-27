import { HttpClient } from "../../src/infra/httpClient/httpClient";
import { TokenService } from "../../src/services/auth/tokenService";

const controllers = {
  async storeRefreshToken(req, res) {
    const context = { req, res };
    const refreshToken = req.headers["refresh_token"];

    TokenService.saveRefreshToken(refreshToken, context);

    res.json({
      data: {
        message: "Refresh token stored",
      },
    });
  },

  async refreshAccessToken(req, res) {
    const context = { req, res };
    const refresh_token =
      TokenService.getRefreshToken(context) || req.headers["refresh_token"];

    try {
      const response = await HttpClient("/refresh", {
        method: "POST",
        body: { refresh_token },
        useDefaultUrl: true,
        refresh: false,
      });

      TokenService.save(response.data.access_token, context);
      TokenService.saveRefreshToken(response.data.refresh_token, context);

      res.status(200).json({
        data: {
          message: "Access token refreshed",
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
        },
      });
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  },

  async logout(req, res) {
    const context = { req, res };

    TokenService.removeRefreshToken(context);

    res.status(204).json({
      data: {
        message: "Deleted with success.",
      },
    });
  },
};

const controllerBy = {
  POST: controllers.storeRefreshToken,
  GET: controllers.refreshAccessToken,
  DELETE: controllers.logout,
};

export default function handler(req, res) {
  if (req.method in controllerBy) {
    return controllerBy[req.method](req, res);
  }

  res.status(404).json({ message: "Not found" });
}
