import { withSessionHOC } from "../../src/services/auth/session";

const AuthPageStatic = (props) => {
  return (
    <div>
      <h1>Auth Page Static</h1>
      <p>
        <a href="/auth/logout">Logout</a>
      </p>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};

export default withSessionHOC(AuthPageStatic);
