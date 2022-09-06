export const useFetch = <T>() => {
  // We assigning AbortController to ref because we need to use
  // abort function in consumer component/hook.
  const ctrl = useRef<AbortController | null>(null);
  const [state, setState] = useState<State<T>>({ type: "idle" });

  const abort = () => {
    ctrl.current?.abort();
  };

  const handleFetch = async (promiseFn: PromiseFn<T>) => {
    abort(); // Aborts previous request if pending.

    // Recreating AbortController per request.
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
    // Aborts request when Component which using this hook unmounts.
    return () => {
      abort();
    };
  }, []);

  return [state, handleFetch, abort] as const;
};

// Example of usage in component.

const UsersComponent = () => {
  const [users, fetchUsers, abortFetchUsers] = useFetch<User>();
  // Add any logic here.
};
