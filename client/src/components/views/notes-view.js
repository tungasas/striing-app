/** @jsxImportSource @emotion/react */
import * as React from "react";
import { client } from "../../utils/api-client";
import NoteForm from "../note/note-form";
import NotePreview from "../note/note-preview";

function noteReducer(state, data) {
  if (Array.isArray(data)) {
    return data;
  } else {
    return [data, ...state];
  }
}

function NotesView({ runAsync, data }) {
  const [notes, setNotes] = React.useReducer(noteReducer, []);
  const viewRef = React.useRef();
  const colHeights = React.useRef([]);
  const noteDimensions = React.useRef([]);
  const [firstRender, setFirstRender] = React.useState(true);

  const setNoteDimensions = React.useCallback(
    (value, index) => {
      if (firstRender) {
        noteDimensions.current[index] = value;
        const y = Math.min(...colHeights.current);
        const xIndex = colHeights.current.findIndex((height) => height === y);
        const x = xIndex * 256;
        colHeights.current[xIndex] += noteDimensions.current[index].height + 16;
        noteDimensions.current[index]["x"] = x;
        noteDimensions.current[index]["y"] = y;
        if (index === notes.length - 1 && firstRender) setFirstRender(false);
      }
    },
    [notes.length, firstRender]
  );

  const getNoteTransform = React.useCallback(
    (index) => {
      if (firstRender) {
        return { x: 0, y: 0 };
      }

      return {
        x: noteDimensions.current[index].x,
        y: noteDimensions.current[index].y,
      };
    },
    [firstRender]
  );

  React.useEffect(() => {
    if (data) {
      setNotes(data)

      noteDimensions.current = [];
      colHeights.current = Array(
        Math.floor(viewRef.current.offsetWidth / 256)
      ).fill(0);
      setFirstRender(true);
    }
  }, [data]);

  React.useEffect(() => {
    colHeights.current = Array(
      Math.floor(viewRef.current.offsetWidth / 256)
    ).fill(0);
  }, []);

  // const handleResize = React.useCallback(() => {
  //   colHeights.current = Array(
  //     Math.floor(viewRef.current.offsetWidth / 256)
  //   ).fill(0);
  //   noteDimensions.current = [];
  //   setFirstRender(true);
  // }, []);

  // React.useEffect(() => {
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, [handleResize]);

  React.useEffect(() => {
    runAsync(client("/api/notes/", { data: { note: true } }));
  }, [runAsync]);

  return (
    <div ref={viewRef}>
      <NoteForm runAsync={runAsync} />
      <div
        css={{
          width: `${colHeights.current.length * 256 + 16}px`,
          margin: "0 auto",
        }}
      >
        {notes.map((note, index) => (
          <NotePreview
            key={note._id}
            title={note.title}
            content={note.content}
            transform={getNoteTransform(index)}
            setNoteDimensions={setNoteDimensions}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default NotesView;
