/** @jsxImportSource @emotion/react */
import * as React from "react";
import Logo from "./components/logo";
import * as styles from "./styles/styles";
import {
  RouterLink,
  Input,
  FormGroup,
  Button,
  Spinner,
  ErrorMessage,
} from "./components/lib";
import { Modal, ModalUnderlying, ModalGuts } from "./components/modal/modal";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useAsync } from "./utils/hooks";

function LoginForm({ onSubmit, type }) {
  const { isLoading, isError, error, run } = useAsync();

  function handleSubmit(event) {
    event.preventDefault();
    const { username, password } = event.target.elements;

    run(
      onSubmit({
        username: username.value,
        password: password.value,
      })
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {isError ? <ErrorMessage error={error} /> : null}
      <FormGroup>
        <label htmlFor="username">Email</label>
        <Input id="username" type="email" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <FormGroup>
        <Button type="submit" variant="primary">
          {isLoading ? <Spinner /> : type}
        </Button>
      </FormGroup>
    </form>
  );
}

function UnauthenticatedApp({ login, register }) {
  return (
    <Router>
      <main
        css={{
          display: "flex",
          flexFlow: "column",
          height: "1px",
          minHeight: "100vh",
        }}
      >
        <nav css={styles.nav}>
          <Logo />
          <div>
            <RouterLink to="/login">Log in</RouterLink>
            <RouterLink to="/signup">Sign up</RouterLink>
          </div>
        </nav>
        <section css={{ flex: "1" }}>
          <div css={styles.contentWrapper}>
            <div css={styles.content}>
              <h1 css={styles.heading}>
                Hi there, come make a{" "}
                <span css={{ textDecoration: "underline" }}>
                  note, to-do list, and more...
                </span>
              </h1>
              <RouterLink to="/login" variant="homeCTALink">
                Get started
              </RouterLink>
            </div>
          </div>
        </section>
      </main>

      {/* Modal */}
      <Switch>
        <Route path="/login">
          <Modal>
            <ModalUnderlying>
              <RouterLink to="/" variant="closeModal">
                X
              </RouterLink>
              <ModalGuts>
                <h2>Log in</h2>
                <Logo />
                <p>to save your progress</p>
                <LoginForm key={"login"} type="Log in" onSubmit={login} />
                <p>
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
              </ModalGuts>
            </ModalUnderlying>
          </Modal>
        </Route>
        <Route path="/signup">
          <Modal>
            <ModalUnderlying>
              <RouterLink to="/" variant="closeModal">
                X
              </RouterLink>
              <ModalGuts>
                <h2>Sign up</h2>
                <Logo />
                <p>to save your progress</p>
                <LoginForm key={"signup"} type="Sign up" onSubmit={register} />
                <p>
                  Already signed up? <Link to="/login">Go to login</Link>
                </p>
              </ModalGuts>
            </ModalUnderlying>
          </Modal>
        </Route>
      </Switch>
    </Router>
  );
}

export default UnauthenticatedApp;
