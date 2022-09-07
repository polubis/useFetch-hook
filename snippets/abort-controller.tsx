const UserDetails = () => {
  const [id, setId] = useState(0);

  useEffect(() => {
    // Simulation of a "specific" user.
    const interval = setInterval(() => {
      setId((prevId) => prevId + 1);
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  });

  // Code inside is called always when id changes.
  useEffect(() => {
    // One instance per request.
    const ctrl = new AbortController();

    const handleDetailsLoad = async () => {
      try {
        // Signal needs to be passed to fetch.
        const response = await fetch("[ADD_URL_HERE]", { signal: ctrl.signal });

        if (response.status < 200 || response.status >= 400) {
          throw new Error("Server error");
        }

        await response.json();
      } catch (error: unknown) {
        if (ctrl.signal.aborted) {
          // Error is also thrown when the request is aborted.
          // You don't need to handle that.
          console.warn("Request aborted");
          return;
        }

        // Here you can handle typical server errors.
      }
    };

    handleDetailsLoad();

    return () => {
      ctrl.abort();
    };
  }, [id]);
};
