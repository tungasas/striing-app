/** @jsxImportSource @emotion/react */
import * as React from "react";
import styled from "@emotion/styled";
import { InputForm } from "../lib";

const NotePreviewTitle = styled.div({
  padding: "12px 16px 0",
  fontSize: "18px",
  fontWeight: "400",
  lineHeight: "1.5",
  minHeight: "38px",
});

const NotePreviewContent = styled.div({
  padding: "8px 16px 12px 16px",
  minHeight: "30px",
  fontSize: "14px",
  lineHeight: "1.5",
});

function NotePreview({ title, content, transform, setNoteDimensions, index }) {
  const noteRef = React.useRef();

  React.useEffect(() => {
    setNoteDimensions(
      {
        width: noteRef.current.offsetWidth,
        height: noteRef.current.offsetHeight,
      },
      index
    );
  }, [setNoteDimensions, index]);
  // console.log("preview " + transform.x + "  " + transform.y);
  return (
    <div
      ref={noteRef}
      css={{
        width: "240px",
        margin: "16px",
        position: "absolute",
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }}
    >
      <div
        css={{
          border: "1px solid #E0e5ed",
          borderRadius: "10px",
          background: "white",
        }}
      >
        <div>
          {title !== "" && <NotePreviewTitle>{title}</NotePreviewTitle>}
          {content !== "" && <NotePreviewContent>{content}</NotePreviewContent>}
        </div>
        <div css={{ height: "32px" }}></div>
      </div>
    </div>
  );
}

export default NotePreview;
