import * as mq from "./media-queries";

export const nav = {
  display: "flex",
  alignItems: "center",
  padding: "1% 3%",
  justifyContent: "space-between",
};

export const contentWrapper = {
  position: "relative",
  borderTopLeftRadius: "15px",
  borderBottomLeftRadius: "15px",
  marginLeft: "3%",
  boxShadow: "0px 1px 2px rgb(186, 193, 211)",
  background:
    "linear-gradient(149deg,rgba(212, 225, 255, 1) 0%,rgba(242, 226, 254, 1) 25%, rgba(228, 246, 246, 1) 50%, rgba(190, 242, 252, 1) 75%, rgba(182, 230, 249, 1) 100%)",
  height: "90%",
  [mq.small]: {
    marginLeft: "4%",
  },
};

export const content = {
  position: "absolute",

  width: "35%",
  left: "5%",
  bottom: "12%",

  [mq.small]: {
    width: "88%",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    bottom: "8%",
  },
};

export const heading = {
  fontSize: "4em",
  margin: "0",

  [mq.medium]: {
    fontSize: "2.8em",
  },
  [mq.small]: {
    fontSize: "2.6em",
  },
};
