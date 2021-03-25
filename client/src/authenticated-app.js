/** @jsxImportSource @emotion/react */
import * as React from "react";
// prettier-ignore
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import { SidebarApp } from "./components/sidebar-app";
import NavbarApp from "./components/navbar-app";
import NotesView from "./components/views/notes-view";
import { useAsync } from "./utils/hooks";

function AppRoutes({ runAsync, data }) {
  return (
    <Switch>
      <Route exact path={`/notes`}>
        <NotesView runAsync={runAsync} data={data} />
      </Route>
      <Route exact path={`/archived`}>
        archived
      </Route>
      <Route exact path={`/trash`}>
        trash
      </Route>
      <Redirect from="*" to="/notes" />
    </Switch>
  );
}

function AuthenticatedApp({ user, logout }) {
  const { data, isLoading, isError, error, run } = useAsync();
  const navbarProps = { logout, isLoading, isError, error };

  return user ? (
    <Router>
      <div css={{ display: "flex" }}>
        <div>
          <div css={{ minWidth: "240px" }} />
          <SidebarApp />
        </div>
        <div css={{ width: "100%" }}>
          <div>
            <NavbarApp {...navbarProps} />
          </div>
          <div>
            <AppRoutes runAsync={run} data={data} />
          </div>
        </div>
      </div>
    </Router>
  ) : (
    <Redirect to="/" />
  );
}

export default AuthenticatedApp;
