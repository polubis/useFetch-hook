export const useFetch = <T>() => {
  const ctrl = useRef<AbortController | null>(null);

  const abort = () => {
    ctrl.current?.abort();
  };

  const handleFetch = async (promiseFn: PromiseFn<T>) => {
    abort();

    ctrl.current = new AbortController();
  };

  useEffect(() => {
    return () => {
      abort();
    };
  }, []);

  return [state, handleFetch, abort] as const;
};

// In fetch

await fetch("https://jsonplaceholder.typicode.com/photos", {
  signal,
});

// In component
const Component = () => {
  // Abort happens when next request starts.
  // Abort happens when this component will be unmounted.
  const [state, startFetch, abortFetch] = useState<AnyModel>();
  const [id, setId] = useState(id);

  // So you can use abortFetch to cancel request on specified cases.
  useEffect(() => {
    if (id === null) {
      abortFetch();
    }

    startFetch();
  }, [id]);
};
