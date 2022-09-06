import { useFetch } from "useFetch";
import { User, UsersService } from "UsersService";
import { useEffect } from "react";

export const useUsersFetch = () => {
  const [usersState, fetchUsers, abort] = useFetch<User[]>();

  const handleFetchUsers = () => {
    fetchUsers(UsersService.getMany);
  };

  useEffect(() => {
    handleFetchUsers();

    return () => {
      abort();
    };
  }, []);

  return [usersState] as const;
};
