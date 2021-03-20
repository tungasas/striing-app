/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import * as colors from "../styles/colors";
import * as mq from "../styles/media-queries";
import { FaSpinner, FaExclamationCircle } from "react-icons/fa";

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

const HomeNavButton = styled.button({
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

  margin: "0.1em 0 0.5em 0.6em",
  fontSize: "1.2em",
  "&:hover": {
    backgroundSize: "100% 3px",
  },
});

const HomeCTAButton = styled.button({
  backgroundColor: colors.primary,
  color: "white",
  border: "none",
  borderRadius: "5px",
  fontWeight: "700",
  padding: "0.7em 1.5em",

  fontSize: "1.2em",
  marginTop: "3em",

  [mq.large]: {
    fontSize: "1.5em",
  },
});

const Input = styled.input({
  border: "1px solid #f1f1f4",
  background: "#f1f2f7",
  padding: "8px 12px",
  borderRadius: "3px",
  margin: "10px 20px",
});

const FormGroup = styled.div({
  display: "flex",
  flexDirection: "column",
});

const buttonVariants = {
  primary: {
    background: colors.primary,
    color: "white",
  },
  secondary: {
    background: colors.base,
    color: colors.text,
  },
};
const Button = styled.button(
  {
    padding: "10px 15px",
    margin: "10px 20px",
    border: "0",
    lineHeight: "1",
    borderRadius: "3px",
  },
  ({ variant = "primary" }) => buttonVariants[variant]
);

function ErrorMessage({ error, ...props }) {
  return (
    <div css={{ color: colors.danger }}>
      <span>{FaExclamationCircle} </span> {error.message}
    </div>
  );
}

export {
  HomeNavButton,
  HomeCTAButton,
  Input,
  FormGroup,
  Button,
  Spinner,
  ErrorMessage,
};
