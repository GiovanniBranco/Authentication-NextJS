import { withSession } from "../../src/services/auth/session";

export const getServerSideProps = withSession((context) => {
  return {
    props: {
      session: context.req?.session ?? null,
    },
  };
});

const AuthPageSSR = (props) => {
  return (
    <div>
      <h1>Auth Page Server Side Render</h1>
      <p>
        <a href="/auth/logout">Logout</a>
      </p>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};

export default AuthPageSSR;
