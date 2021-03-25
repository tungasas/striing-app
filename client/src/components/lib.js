/** @jsxImportSource @emotion/react */
import * as React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import * as colors from "../styles/colors";
import * as mq from "../styles/media-queries";
import { FaSpinner, FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import ContentEditable from "react-contenteditable";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
});
Spinner.defaultProps = {
  "aria-label": "loading",
};

const Input = styled.input({
  border: "1px solid #f1f1f4",
  background: "#f1f2f7",
  padding: "8px 12px",
  borderRadius: "3px",
  margin: "10px 20px",
});

const inputFormVariants = {
  title: {
    padding: "12px 16px",
    fontSize: "18px",
    color: colors.title,
  },
  content: {
    padding: "12px 16px",
    fontSize: "14px",
  },
};

const InputForm = styled(ContentEditable)(({ variant }) => [
  css`
    &:empty::before {
      content: "${variant === "title"
        ? "Title"
        : variant === "content"
        ? "Take a note..."
        : ""}";
      color: gray;
      cursor: text;
    }
  `,
  inputFormVariants[variant],
]);

// function InputForm({ variant, html, ...props }) {
//   const label =
//     variant === "title"
//       ? "Title"
//       : variant === "content"
//       ? "Take a note..."
//       : "";

//   return (
//     <ContentEditable
//       html={html}
//       onPaste={(event) => {
//         event.preventDefault();
//         document.execCommand(
//           "inserttext",
//           false,
//           event.clipboardData.getData("text/plain")
//         );
//       }}
//       css={[
//         css`
//           &:empty::before {
//             content: "${label}";
//             color: gray;
//             cursor: text;
//           }
//         `,
//         inputFormVariants[variant],
//       ]}
//       {...props}
//     />
//   );
// }

const FormGroup = styled.div({
  display: "flex",
  flexDirection: "column",
});

const buttonVariants = {
  primary: {
    padding: "10px 15px",
    margin: "10px 20px",
    background: colors.primary,
    color: "white",
  },
  secondary: {
    background: colors.base,
    color: colors.text,
  },
  transparent: {
    background: "transparent",
    position: "absolute",
    top: "5px",
    right: "3px",
    fontWeight: "700",
    fontSize: "1.2em",
  },
  closeNote: {
    padding: "10px 16px",
    marginRight: "15px",
    background: "none",
    color: colors.title,
    fontSize: "16px",
    "&:hover": {
      backgroundColor: colors.gray1,
    },
    "&:focus": {
      backgroundColor: colors.gray10,
      outline: "none",
    },
  },
};
const Button = styled.button(
  {
    border: "0",
    lineHeight: "1",
    borderRadius: "3px",
    color: colors.text,
  },
  ({ variant = "primary" }) => buttonVariants[variant]
);

const linkVariants = {
  homeCTALink: {
    backgroundColor: colors.primary,
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontWeight: "700",
    padding: "0.6em 1.3em",
    display: "inline-block",

    fontSize: "1.2em",
    marginTop: "2.6em",

    [mq.large]: {
      fontSize: "1.3em",
    },
  },
  homeNavLink: {
    fontWeight: "400",
    color: "#2c334d",
    background: "none",
    border: "none",

    backgroundImage: "linear-gradient(to right, #3b68ff 0%, #3b68ff)",
    backgroundOrigin: "content-box",
    backgroundSize: "0% 4px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0% 100%",
    transition: "background-size 0.2s",

    margin: "0.1em 0 0.5em 1.1em",
    fontSize: "1.1em",
    "&:hover": {
      backgroundSize: "100% 3px",
    },
  },
  closeModal: {
    background: "transparent",
    position: "absolute",
    top: "0px",
    right: "3px",
    fontWeight: "700",
    fontSize: "1.2em",
    zIndex: "60",
    padding: "5px",
  },
};

const RouterLink = styled(Link)(
  { textDecoration: "none" },
  ({ variant = "homeNavLink" }) => linkVariants[variant]
);

function ErrorMessage({ error, type = "block", ...props }) {
  const displayType = {
    inline: "inline",
    block: "block",
  };

  return (
    <div
      css={{
        color: colors.danger,
        marginBottom: "5px",
        display: displayType[type],
      }}
    >
      <span>{FaExclamationCircle} </span> {error.message || error}
    </div>
  );
}

export {
  RouterLink,
  Input,
  InputForm,
  FormGroup,
  Button,
  Spinner,
  ErrorMessage,
};
