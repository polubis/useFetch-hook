export interface RendererProps<T> {
  state: State<T>;
  pending: () => ReactElement;
  fail: (error: unknown) => ReactElement;
  children: (data: T) => ReactElement;
}

export const Renderer = <T extends unknown>({
  state,
  pending,
  fail,
  children: done,
}: RendererProps<T>) => {
  if (state.type === "pending") {
    return pending();
  }

  if (state.type === "fail") {
    return fail(state.error);
  }

  if (state.type === "done") {
    return done(state.data);
  }

  return null;
};
