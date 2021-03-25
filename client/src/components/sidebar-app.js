/** @jsxImportSource @emotion/react */
import * as React from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import Logo from "./logo";
import * as colors from "../styles/colors";

const Sidebar = styled.div`
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 240px; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 50; /* Stay on top */
  top: 0; /* Stay at the top */
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
`;

function RouterLink({ ...props }) {
  return (
    <NavLink
      css={{
        padding: "10px 15px",
        textDecoration: "none",
        fontSize: "18px",
        backgroundColor: "none",
        color: "#8295B0",
        display: "block",
        margin: "40px 40px",
        borderRadius: "6px",
        fontWeight: "700",
        border: "solid 2px transparent",
        "&:hover": {
          backgroundColor: colors.gray10,
        },
      }}
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
        <RouterLink to="/notes">Notes</RouterLink>
        <RouterLink to="/archived">Archived</RouterLink>
        <RouterLink to="/trash">Trash bin</RouterLink>
      </div>
    </Sidebar>
  );
}

export { Sidebar, RouterLink, SidebarApp };
