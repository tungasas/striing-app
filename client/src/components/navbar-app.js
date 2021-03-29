/** @jsxImportSource @emotion/react */
import * as React from "react";
import { RouterLink } from "./lib";
import * as colors from "../styles/colors";
import * as mq from "../styles/media-queries";
import { Spinner, ErrorMessage } from "./lib";

function NavbarApp({ logout, isLoading, isError, error }) {
  return (
    <div>
      <div css={{ height: "60px" }}></div>
      <div
        css={{
          position: "fixed",
          zIndex: "40",
          top: "0",
          right: "0",
          width: "calc(100% - 240px)",

          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          borderBottom: `1px solid ${colors.gray10}`,
          backgroundColor: colors.base,
          [mq.small]: {
            width: "calc(100% - 80px)",
          },
        }}
      >
        <div css={{ height: "60px" }}></div>
        <div css={{ marginRight: "20px" }}>
          {isLoading ? (
            <Spinner />
          ) : (
            isError && <ErrorMessage error={error} type="inline" />
          )}
          <RouterLink to="/" variant="homeNavLink" onClick={() => logout()}>
            Logout
          </RouterLink>
        </div>
      </div>
    </div>
  );
}

export default NavbarApp;
