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
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          return error;
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

export { useAsync };
