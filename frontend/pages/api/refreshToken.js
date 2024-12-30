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
    const refresh_token = TokenService.getRefreshToken(context);

    const response = await HttpClient("refresh", {
      method: "POST",
      body: { refresh_token },
    });

    TokenService.save(response.data.access_token, context);
    TokenService.saveRefreshToken(response.data.refresh_token, context);

    res.json({
      data: {
        message: "Access token refreshed",
      },
    });
  },
};

const controllerBy = {
  POST: controllers.storeRefreshToken,
  GET: controllers.refreshAccessToken,
};

export default function handler(req, res) {
  if (req.method in controllerBy) {
    return controllerBy[req.method](req, res);
  }

  res.status(404).json({ message: "Not found" });
}
