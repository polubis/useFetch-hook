import { useFetch } from "useFetch";
import { User, UsersService } from "UsersService";

export const useUsersFetch = () => {
  const [usersState, fetchUsers] = useFetch<User[]>();

  const handleFetchUsers = () => {
    fetchUsers(UsersService.getMany);
  };

  return [usersState, handleFetchUsers] as const;
};
