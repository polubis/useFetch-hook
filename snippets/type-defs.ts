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
// Helper type - function which will be passed to handler in hook.
export type PromiseFn<T> = () => Promise<T>;
// Alias type for reduction boilerplate.
export type Signal = AbortController["signal"];
