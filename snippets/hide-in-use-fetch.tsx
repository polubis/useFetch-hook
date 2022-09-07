// --- useUsersFetch.ts ---
export const useUsersFetch = () => {
  // It still stinks.
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [loadingUsersError, setLoadingUsersError] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const ctrl = new AbortController();

    const handleCall = async () => {
      setIsLoadingUsers(true);
      setLoadingUsersError("");
      setUsers([]);

      try {
        const users = await UsersService.getMany(ctrl.signal);

        setIsLoadingUsers(false);
        setUsers(users);
      } catch (error: unknown) {
        setIsLoadingUsers(false);
        setLoadingUsersError("Something went wrong");
      }
    };

    handleCall();

    return () => {
      ctrl.abort();
    };
  }, []);

  return [isLoadingUsers, loadingUsersError, users]
};

// --- UsersPage.tsx ---
export const UsersPage = () => {
  // Now code is more elegant.
  const [isLoadingUsers, loadingUsersError, users] = useUsersFetch();

  if (isLoadingUsers) {
    return <AvatarsGrid />;
  }

  if (!!loadingUsersError) {
    return <ErrorMessage error={loadingUsersError} />;
  }

  return (
    <AvatarsGrid>
      {users.map((user) => (
        <img key={user.id} src={user.avatar} alt={user.name} />
      ))}
    </AvatarsGrid>
  );
};
