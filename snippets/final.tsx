// --- Users.tsx ---
interface UsersProps {
  state: State<User[]>;
  onItemClick: (id: User["id"]) => void;
}

export const Users = ({ state, onItemClick }: UsersProps) => {
  return (
    <div className={css.layout}>
      <Renderer<User[]>
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
      </Renderer>
    </div>
  );
};

// --- UserDetail.tsx ---
interface UserDetailsProps {
  state: State<User>;
  onBack: () => void;
}

export const UserDetails = ({ state, onBack }: UserDetailsProps) => {
  return (
    <div className={css.layout}>
      {state.type === "pending" && <Avatar className={css.placeholder} />}
      {state.type === "fail" && <ErrorMessage error={state.error} />}
      {state.type === "done" && (
        <div className={css.details}>
          <Avatar>
            <img src={state.data.avatar} alt={state.data.name} />
          </Avatar>
          <div>
            <b>Id: </b>
            <span>{state.data.id}</span>
          </div>
          <div>
            <b>Email: </b>
            <span>{state.data.email}</span>
          </div>
          <div>
            <b>Name: </b>
            <span>{state.data.name}</span>
          </div>
        </div>
      )}
      <footer>
        <Button onClick={onBack}>Back</Button>
      </footer>
    </div>
  );
};

// --- UsersPage ---
export const UsersPage = () => {
  const [usersState] = useUsersFetch();
  const [activeUserId, userState, changeActiveUserId] = useUserFetch();

  return activeUserId === null ? (
    <Users state={usersState} onItemClick={changeActiveUserId} />
  ) : (
    <UserDetails state={userState} onBack={() => changeActiveUserId(null)} />
  );
};
