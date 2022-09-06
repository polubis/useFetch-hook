export const useFetch = <T>() => {
  const [state, setState] = useState<State<T>>({ type: "idle" });

  const handleFetch = async (promiseFn: PromiseFn<T>) => {
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

// Usage in component

const Component = () => {
  const [currentState, startFetch] = useFetch<AnyModel>();
};
