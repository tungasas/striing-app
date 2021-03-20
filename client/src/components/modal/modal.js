/** @jsxImportSource @emotion/react */
import * as React from "react";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import * as colors from "../../styles/colors";

const animModalOverlay = keyframes`
  from {background-color: none;}
  to {background-color: rgba(0, 0, 0, 0.6);}
`;

function ModalUnderlying({ children, ...props }) {
  return (
    <div
      css={{
        width: "300px",
        maxWidth: "100%",
        height: "450px",
        maxHeight: "100%",

        position: "fixed",
        zIndex: "100",

        left: "50%",
        top: "50%",

        transform: "translate(-50%, -50%)",

        background: "white",
        boxShadow: "0 0 40px 5px rgba(0, 0, 0, 0.5)",
        borderRadius: "5px",
        borderTop: `solid ${colors.primary} 6px`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

const ModalGuts = styled.div(css`
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 20px;
`);

const ModalOverlay = styled.div(css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.6);
  ${"" /* animation: ${animModalOverlay} 0.3s both; */}
`);

function Modal({ children }) {
  return (
    <div>
      <ModalOverlay />
      {children}
    </div>
  );
}

export { Modal, ModalUnderlying, ModalGuts };
