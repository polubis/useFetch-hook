import { useRef, useState } from "react";

export interface Idle {
  type: "idle";
}

export interface Pending {
  type: "pending";
}

export interface Done<R> {
  type: "done";
  data: R;
}

export interface Fail {
  type: "fail";
  error: unknown;
}

export type State<R> = Idle | Pending | Done<R> | Fail;
export type Signal = AbortController["signal"];
export type PromiseFn<R> = (signal: Signal) => Promise<R>;

export const useFetch = <R>() => {
  const abortController = useRef(new AbortController());
  const [state, setState] = useState<State<R>>({ type: "idle" });

  const handleFetch = async (promiseFn: PromiseFn<R>) => {
    setState({ type: "pending" });

    try {
      const data = await promiseFn(abortController.current.signal);
      setState({ type: "done", data });
    } catch (error: unknown) {
      if (abortController.current.signal) {
        console.warn("Request aborted");
      }

      setState({ type: "fail", error });
    }
  };

  const abort = () => {
    abortController.current.abort();
  };

  return [state, handleFetch, abort] as const;
};
