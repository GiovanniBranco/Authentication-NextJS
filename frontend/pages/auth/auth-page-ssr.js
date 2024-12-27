import { TokenService } from "../../src/services/auth/tokenService";

export const getServerSideProps = async (context) => {
  const token = TokenService.get(context);
  return {
    props: {
      token,
    },
  };
};

const AuthPageSSR = (props) => {
  return (
    <div>
      <h1>Auth Page Server Side Render</h1>
    </div>
  );
};

export default AuthPageSSR;
