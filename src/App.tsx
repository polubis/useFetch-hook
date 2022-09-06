import { UserDetails, Users } from "containers";
import { useUserFetch } from "useUserFetch";
import { useUsersFetch } from "useUsersFetch";

function App() {
  const [usersState] = useUsersFetch();
  const [activeUserId, userState, fetchUser] = useUserFetch();

  return activeUserId === null ? (
    <Users state={usersState} onItemClick={fetchUser} />
  ) : (
    <UserDetails state={userState} />
  );
}

export default App;
