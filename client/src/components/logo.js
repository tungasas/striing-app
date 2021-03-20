/** @jsxImportSource @emotion/react */
import * as React from "react";
import * as colors from "../styles/colors";

function Logo({ css }) {
  return (
    <h1
      css={{
        fontFamily: "'Ubuntu', sans-serif",
        fontSize: "2.5em",
        margin: "0.1em 0 0.5em",
        ...css,
      }}
    >
      <span css={{ color: colors.primary }}>S</span>triing
    </h1>
  );
}

export default Logo;
