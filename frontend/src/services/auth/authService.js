const DEFAULT_URL = "http://localhost:4000/api";

export const AuthService = {
  async login(values) {
    return fetch(`${DEFAULT_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
};
