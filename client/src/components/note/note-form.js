/** @jsxImportSource @emotion/react */
import * as React from "react";
import { InputForm, FormGroup, Button } from "../lib";
import styled from "@emotion/styled";
import * as colors from "../../styles/colors";
import { useNote } from "../../utils/hooks";
import * as noteAPI from "../../utils/note-provider";

const NoteContainerVariants = {
  noteForm: {
    width: "80%",
    maxWidth: "600px",
    boxShadow: "0 1px 5px 2px rgba(0, 0, 0, 0.1)",
  },
};

const NoteContainer = styled.div(
  {
    border: `1px solid ${colors.gray10}`,
    borderRadius: "10px",
    margin: "38px auto 18px auto",
    overflow: "hidden",
  },
  ({ variant }) => NoteContainerVariants[variant]
);

function pasteAsPlainText(event) {
  event.preventDefault();
  document.execCommand(
    "inserttext",
    false,
    event.clipboardData.getData("text/plain")
  );
}

function NoteForm({ runAsync }) {
  const { note, setNote } = useNote();
  const titleHtmlRef = React.useRef("");
  const contentHtmlRef = React.useRef("");
  const contentRef = React.useRef();

  const [focused, setFocused] = React.useState(false);
  const formRef = React.useRef();

  React.useEffect(() => {
    if (
      focused ||
      (titleHtmlRef.current === "" && contentHtmlRef.current === "")
    )
      return;
    titleHtmlRef.current = "";
    contentHtmlRef.current = "";
    contentRef.current.innerHTML = "";
    runAsync(noteAPI.createNote(note));
  }, [note, focused, runAsync]);

  const handleMouseDown = React.useCallback((e) => {
    if (!formRef.current.contains(e.target)) {
      setFocused(false);
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handleMouseDown]);

  return (
    <NoteContainer variant="noteForm">
      <div ref={formRef} onFocus={() => setFocused(true)}>
        <div>
          {focused && (
            <FormGroup>
              <InputForm
                variant="title"
                html={titleHtmlRef.current}
                spellCheck="false"
                onPaste={pasteAsPlainText}
                onChange={(e) => {
                  titleHtmlRef.current = e.target.value;
                  setNote({ type: "title", value: titleHtmlRef.current });
                }}
              />
            </FormGroup>
          )}
          <FormGroup>
            <InputForm
              variant="content"
              innerRef={contentRef}
              html={contentHtmlRef.current}
              spellCheck="false"
              onPaste={pasteAsPlainText}
              onChange={(e) => {
                contentHtmlRef.current = e.target.value;
                setNote({ type: "content", value: contentHtmlRef.current });
              }}
            />
          </FormGroup>
        </div>
        {focused && (
          <div
            css={{
              display: "flex",
              justifyContent: "space-between",
              margin: "5px 0",
            }}
          >
            <div></div>
            <div>
              <Button
                variant="closeNote"
                onClick={() => {
                  setFocused(false);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </NoteContainer>
  );
}

export default NoteForm;
