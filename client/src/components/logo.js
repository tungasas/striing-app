/** @jsxImportSource @emotion/react */
import * as React from "react";
import * as colors from "../styles/colors";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/"
      css={{
        fontFamily: "'Ubuntu', sans-serif",
        fontSize: "2.5em",
        margin: "0.09em 0 0.45em",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <span css={{ color: colors.primary, fontFamily: "inherit" }}>S</span>
      triing
    </Link>
  );
}

export default Logo;
