import * as React from "react";

function useSafeDispatch(dispatch) {
  const mounted = React.useRef(false);
  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  }, []);

  return React.useCallback(
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch]
  );
}

/* useAsync */
const defaultInitialState = { status: "idle", data: null, error: null };
function useAsync(initialState) {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  });

  const [{ status, data, error }, setState] = React.useReducer(
    (s, a) => ({ ...s, ...a }),
    initialStateRef.current
  );

  const setSafeState = useSafeDispatch(setState);

  const setData = React.useCallback(
    (data) => setSafeState({ status: "resolved", data: data }),
    [setSafeState]
  );
  const setError = React.useCallback(
    (error) => setSafeState({ status: "rejected", error: error }),
    [setSafeState]
  );
  const reset = React.useCallback(() => {
    setSafeState(initialStateRef.current);
  }, [setSafeState]);

  const run = React.useCallback(
    (promise) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        );
      }

      setSafeState({ status: "pending" });

      return promise
        .then((res) => {
          setData(res.data);
          return res.data;
        })
        .catch((error) => {
          setError(error.response.data);
          return error.response.data;
        });
    },
    [setSafeState, setData, setError]
  );

  return {
    isIdle: status === "idle",
    isLoading: status === "pending",
    isSuccess: status === "resolved",
    isError: status === "rejected",
    status,
    data,
    error,
    run,
    reset,
    setData,
    setError,
  };
}

/* useNote */
const noteDefaultInitialState = { title: "", content: "" };

function noteReducer(state, { type, value }) {
  switch (type) {
    case "all":
      return { ...state, ...value };
    case "title":
      return { ...state, title: value };
    case "content":
      return { ...state, content: value };
    case "color":
      return { ...state, color: value };
    case "label":
      return { ...state, label: value };
    case "archived":
      return { ...state, archived: value };
    case "trashed":
      return { ...state, trashed: value, trashDate: Date.now };
    default:
      throw new Error("Please define an appropriate action for Note");
  }
}
function useNote(initialState) {
  const initialStateRef = React.useRef({
    ...noteDefaultInitialState,
    ...initialState,
  });

  const [note, setNote] = React.useReducer(
    noteReducer,
    initialStateRef.current
  );

  return { note, setNote };
}

export { useAsync, useNote };
