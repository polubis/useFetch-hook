import { UserDetails, Users } from "containers";
import { useUserFetch } from "useUserFetch";
import { useUsersFetch } from "useUsersFetch";

function App() {
  const [usersState] = useUsersFetch();
  const [activeUserId, userState, changeActiveUserId] = useUserFetch();

  return activeUserId === null ? (
    <Users state={usersState} onItemClick={changeActiveUserId} />
  ) : (
    <UserDetails state={userState} onBack={() => changeActiveUserId(null)} />
  );
}

export default App;
