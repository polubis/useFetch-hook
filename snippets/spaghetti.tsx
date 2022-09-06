export const UsersPage = () => {
    // Don't worry - the same code needs to be added for user details.
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
  
    // Some fragile if statements implementation.
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
  