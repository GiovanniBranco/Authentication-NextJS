import { useRouter } from "next/router";
import { useEffect } from "react";
import { TokenService } from "../../src/services/auth/tokenService";
import { HttpClient } from "../../src/infra/httpClient/httpClient";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await HttpClient("/api/refreshToken", {
        method: "DELETE",
        useDefaultUrl: false,
        refresh: false,
      });
      TokenService.remove();
      router.push("/");
    };

    logout();
  }, []);

  return <div>You will be redirect in a moment...</div>;
};

export default Logout;
