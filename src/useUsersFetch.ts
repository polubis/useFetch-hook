import { useFetch } from "useFetch";
import { User, UsersService } from "UsersService";
import { useEffect } from "react";

export const useUsersFetch = () => {
  const [usersState, fetchUsers] = useFetch<User[]>();

  const handleFetchUsers = () => {
    fetchUsers(UsersService.getMany);
  };

  useEffect(() => {
    handleFetchUsers();
  }, []);

  return [usersState] as const;
};
