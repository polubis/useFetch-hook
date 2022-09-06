import { useFetch } from "useFetch";
import { useState } from "react";
import { User, UsersService } from "UsersService";

type ActiveUserId = User["id"] | null;

export const useUserFetch = () => {
  const [activeUserId, setActiveUserId] = useState<ActiveUserId>(null);
  const [userState, fetchUser] = useFetch<User>();

  const initializeFetch = (id: ActiveUserId) => {
    setActiveUserId(id);
    id !== null && handleUserFetch(id);
  };

  const handleUserFetch = (id: User["id"]) => {
    fetchUser((signal) => UsersService.getOne(signal, id));
  };

  return [activeUserId, userState, initializeFetch] as const;
};
