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
