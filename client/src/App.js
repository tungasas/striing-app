import * as React from "react";
import AuthenticatedApp from "./authenticated-app";
import UnauthenticatedApp from "./unauthenticated-app";
import { useAsync } from "./utils/hooks";
import * as auth from "./utils/auth-provider";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const {
    data: user,
    error,
    isIdle,
    isLoading,
    isSuccess,
    isError,
    run,
    setData,
  } = useAsync();

  React.useEffect(() => {
    run(auth.getUser());
  }, [run]);

  const login = (form) =>
    auth.login(form).then((res) => {
      setData(res.data);
      return res;
    });
  const register = (form) =>
    auth.register(form).then((res) => {
      setData(res.data);
      return res;
    });
  const logout = () => {
    auth.logout();
    setData(null);
  };

  if (isLoading || isIdle) {
    // create styled Loading Component
    return <h1>Loading</h1>;
  }

  if (isError) {
    // create styled Error Component
    return <h1>{error.message}</h1>;
  }
  if (isSuccess) {
    return (
      <Router>
        {user ? (
          <AuthenticatedApp user={user} logout={logout} />
        ) : (
          <UnauthenticatedApp login={login} register={register} />
        )}
      </Router>
    );
  }
}

export default App;
