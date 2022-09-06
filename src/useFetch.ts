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
  const ctrl = useRef<AbortController | null>(null);
  const [state, setState] = useState<State<R>>({ type: "idle" });

  const handleFetch = async (promiseFn: PromiseFn<R>) => {
    ctrl.current = new AbortController();

    setState({ type: "pending" });

    try {
      const data = await promiseFn(ctrl.current.signal);
      setState({ type: "done", data });
    } catch (error: unknown) {
      if (ctrl.current.signal) {
        console.warn("Request aborted");
      }

      setState({ type: "fail", error });
    }
  };

  const abort = () => {
    ctrl.current?.abort();
  };

  return [state, handleFetch, abort] as const;
};
