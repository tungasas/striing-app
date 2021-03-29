/** @jsxImportSource @emotion/react */
import * as React from "react";
import { css } from "@emotion/react";
import * as mq from "../styles/media-queries";
import * as colors from "../styles/colors";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/"
      css={css`
        font-family: "Ubuntu", sans-serif;
        font-size: 2.5em;
        margin: 0.09em 0 0.45em;
        text-decoration: none;
        color: inherit;
        &:after {
          content: "triing";
        }
        ${mq.small} {
          &:after {
            content: "tr";
          }
        }
      `}
    >
      <span css={{ color: colors.primary, fontFamily: "inherit" }}>S</span>
    </Link>
  );
}

export default Logo;
