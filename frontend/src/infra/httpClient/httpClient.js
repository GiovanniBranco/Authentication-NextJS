const DEFAULT_URL = process.env.NEXT_PUBLIC_URL_BACKEND_DEFAULT;

export const HttpClient = async (url, options, useDefaultUrl = true) => {
  return fetch(`${useDefaultUrl ? DEFAULT_URL : ""}/${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : null,
  }).then(async (response) => {
    if (response.status === 401) throw new Error("Unauthorized");

    if (!response.ok) throw new Error("Internal server error");

    const body = await response.json();

    return body;
  });
};
