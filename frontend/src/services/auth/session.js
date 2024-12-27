import { AuthService } from "./authService";

export const withSession = (func) => {
  return async (context) => {
    try {
      const session = await AuthService.getSession(context);
      const modifiedContext = {
        ...context,
        req: {
          ...context.req,
          session,
        },
      };

      return func(modifiedContext);
    } catch {
      return {
        redirect: {
          permanent: false,
          destination: "/?error=Unauthorized",
        },
      };
    }
  };
};
