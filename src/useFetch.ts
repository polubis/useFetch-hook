import { useState } from "react";

interface Idle {
  type: "idle";
}

interface Pending {
  type: "pending";
}

interface Done<R> {
  type: "done";
  data: R;
}

interface Fail {
  type: "fail";
  error: unknown;
}

type State<R> = Idle | Pending | Done<R> | Fail;
type PromiseFn<R> = () => Promise<R>;

export const useFetch = <R>() => {
  const [state, setState] = useState<State<R>>({ type: "idle" });

  const handleFetch = async (promiseFn: PromiseFn<R>) => {
    setState({ type: "pending" });

    try {
      const data = await promiseFn();
      setState({ type: "done", data });
    } catch (error: unknown) {
      setState({ type: "fail", error });
    }
  };

  return [state, handleFetch] as const;
};
