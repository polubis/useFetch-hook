// --- UsersPage.tsx ---
export const UsersPage = () => {
  // Generic approach with the option to abort at any time.
  // Initial type "User[]" is also required by the promise function.
  const [usersState, loadUsers, abortLoadUsers] = useFetch<User[]>();

  useEffect(() => {
    // UsersService.getMany it's a promise function which returns Promise<User[]>.
    loadUsers(UsersService.getMany);
  }, []);

  // When you check type property - you have one less check 
  // to perform and Typescript handles that.
  if (usersState.type === "pending") {
    return <AvatarsGrid />;
  }

  // Accessing data is now protected. This property is available
  // only when type = "done".
  if (usersState.type === "done") {
    return (
      <AvatarsGrid>
        {usersState.data.map((user) => (
          <img key={user.id} src={user.avatar} alt={user.name} />
        ))}
      </AvatarsGrid>
    );
  }

  // Same for error property.
  if (usersState.type === "fail") {
    return <ErrorMessage error={usersState.error} />;
  }

  // null for type = "idle".
  return null;
};
