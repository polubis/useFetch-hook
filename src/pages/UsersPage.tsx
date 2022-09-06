import { UserDetails, Users } from "containers";
import { useUserFetch, useUsersFetch } from "facades";

export const UsersPage = () => {
  const [usersState] = useUsersFetch();
  const [activeUserId, userState, changeActiveUserId] = useUserFetch();

  return activeUserId === null ? (
    <Users state={usersState} onItemClick={changeActiveUserId} />
  ) : (
    <UserDetails state={userState} onBack={() => changeActiveUserId(null)} />
  );
};
