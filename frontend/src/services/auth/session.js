import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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

export const useSession = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      try {
        const session = await AuthService.getSession();
        setSession(session);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);

  return {
    data: {
      session,
    },
    loading,
    error,
  };
};

export const withSessionHOC = (Component) => {
  return function Wrapper(props) {
    const router = useRouter();
    const session = useSession();

    if (!session.loading && session.error) router.push("/?error=Unauthorized");

    const modifiedProps = {
      ...props,
      session: session.data.session,
    };

    return <Component {...modifiedProps} />;
  };
};
