// --- useFetch.ts ---
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

// This will force the developer to use a type guard.
export type State<T> = Idle | Pending | Done<T> | Fail;
// Helper type - a function that will be passed to the handler in the hook.
export type PromiseFn<T> = () => Promise<T>;
// Alias type for boilerplate reduction.
export type Signal = AbortController["signal"];
