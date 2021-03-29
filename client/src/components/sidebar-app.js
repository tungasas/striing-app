/** @jsxImportSource @emotion/react */
import * as React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Logo from "./logo";
import * as colors from "../styles/colors";
import * as mq from "../styles/media-queries";
import { BiNotepad, BiArchiveIn, BiTrash } from "react-icons/bi";

import { NavLink } from "react-router-dom";

const Sidebar = styled.div`
  height: 100%;
  width: 240px;
  position: fixed;
  z-index: 50;
  top: 0;
  left: 0;
  background: radial-gradient(
    circle,
    rgba(180, 198, 255, 0.8) 0%,
    rgba(201, 214, 255, 0.8) 20%,
    rgba(230, 235, 255, 0.95) 35%,
    rgba(242, 243, 255, 0.95) 70%,
    rgba(250, 250, 255, 0.95) 100%
  );
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;

  ${"" /* ${mq.small} {
    width: 80px;
  } */}
`;

const iconStyles = {
  width: "25px",
  height: "25px",
  margin: "8px 12px",
};

function RouterLink({ name, ...props }) {
  return (
    <NavLink
      css={[
        {
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          fontSize: "18px",
          backgroundColor: "none",
          color: "#8295B0",
          margin: "40px 40px",
          borderRadius: "6px",
          fontWeight: "700",
          border: "solid 2px transparent",
          "&:hover": {
            backgroundColor: colors.gray10,
          },
        },
        css`
          &:after {
            content: "${name}";
          }
          ${
            "" /* ${mq.small} {
            margin: 40px 15px;
            &:after {
              content: "";
            }
          } */
          }
        `,
      ]}
      activeStyle={{
        backgroundColor: "white",
        color: "rgba(59, 104, 255, 0.9)",
        border: "solid 2px rgba(59, 104, 255, 0.9)",
      }}
      {...props}
    />
  );
}

function SidebarApp() {
  return (
    <Sidebar>
      <div
        css={{
          textAlign: "center",
        }}
      >
        <Logo />
      </div>
      <div>
        <RouterLink to="/notes" name="Notes">
          <BiNotepad css={iconStyles} />
        </RouterLink>
        <RouterLink to="/archived" name="Archived">
          <BiArchiveIn css={iconStyles} />
        </RouterLink>
        <RouterLink to="/trash" name="Trash bin">
          <BiTrash css={iconStyles} />
        </RouterLink>
      </div>
    </Sidebar>
  );
}

export { Sidebar, RouterLink, SidebarApp };
