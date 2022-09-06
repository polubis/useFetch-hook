// -- Renderer.tsx --
export interface RendererProps<T> {
  state: State<T>; // State object from useFetch.
  pending: () => ReactElement; // Renders component when pending.
  fail: (error: unknown) => ReactElement; // Renders component when fail.
  children: (data: T) => ReactElement; // Renders component when done.
}

// We passing generic type for typesafety.
// It must be same type which we passing to useFetch.
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

// --- Usage in Users.tsx ---
<Renderer<User[]> // Generic type passed to component.
  state={state}
  fail={(error) => <ErrorMessage error={error} />}
  pending={() => <AvatarsGrid loading />}
>
  {(data) => (
    <AvatarsGrid>
      {data.map((user) => (
        <img
          key={user.id}
          src={user.avatar}
          alt={user.name}
          onClick={() => onItemClick(user.id)}
        />
      ))}
    </AvatarsGrid>
  )}
</Renderer>;
