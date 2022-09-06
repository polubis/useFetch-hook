/* eslint-disable react-hooks/exhaustive-deps */
import { useFetch } from "utils";
import { useEffect } from "react";
import { User, UsersService } from "services";

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
