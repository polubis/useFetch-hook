import { useRef, useState, useEffect } from "react";

export interface Idle {
  type: "idle";
}

export interface Pending {
  type: "pending";
}

export interface Done<T> {
  type: "done";
  data: T;
}

export interface Fail {
  type: "fail";
  error: unknown;
}

export type State<T> = Idle | Pending | Done<T> | Fail;
export type Signal = AbortController["signal"];
export type PromiseFn<R> = (signal: Signal) => Promise<R>;

export const useFetch = <T>() => {
  const ctrl = useRef<AbortController | null>(null);
  const [state, setState] = useState<State<T>>({ type: "idle" });

  const abort = () => {
    ctrl.current?.abort();
  };

  const handleFetch = async (promiseFn: PromiseFn<T>) => {
    abort();

    ctrl.current = new AbortController();

    setState({ type: "pending" });

    try {
      const data = await promiseFn(ctrl.current.signal);
      setState({ type: "done", data });
    } catch (error: unknown) {
      if (ctrl.current.signal.aborted) {
        console.warn("Request aborted");
        return;
      }

      setState({ type: "fail", error });
    }
  };

  useEffect(() => {
    return () => {
      abort();
    };
  }, []);

  return [state, handleFetch, abort] as const;
};
