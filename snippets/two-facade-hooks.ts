// --- useUserFetch.ts ---
type ActiveUserId = User["id"] | null;

export const useUserFetch = () => {
  const [activeUserId, setActiveUserId] = useState<ActiveUserId>(null);
  const [userState, fetchUser, abortUserFetch] = useFetch<User>();

  const handleUserFetch = (id: User["id"]) => {
    // Passing signal to promise function which will add it to fetch.
    fetchUser((signal) => UsersService.getOne(signal, id));
  };

  const initializeFetch = (id: ActiveUserId) => {
    setActiveUserId(id);
    // Abort any new request, also when it is equal to null.
    abortUserFetch();

    id !== null && handleUserFetch(id);
  };

  return [activeUserId, userState, initializeFetch] as const;
};

// --- useUsersFetch.ts ---
export const useUsersFetch = () => {
  const [usersState, fetchUsers] = useFetch<User[]>();

  const handleFetchUsers = () => {
    // Signal is automatically injected.
    fetchUsers(UsersService.getMany);
  };

  useEffect(() => {
    // Loading users on mount.
    handleFetchUsers();
  }, []);

  return [usersState] as const;
};
