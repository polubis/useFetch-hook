import { useFetch } from "utils";
import { useState } from "react";
import { User, UsersService } from "services";

type ActiveUserId = User["id"] | null;

export const useUserFetch = () => {
  const [activeUserId, setActiveUserId] = useState<ActiveUserId>(null);
  const [userState, fetchUser, abortUserFetch] = useFetch<User>();

  const handleUserFetch = (id: User["id"]) => {
    fetchUser((signal) => UsersService.getOne(signal, id));
  };

  const initializeFetch = (id: ActiveUserId) => {
    setActiveUserId(id);
    abortUserFetch();

    id !== null && handleUserFetch(id);
  };

  return [activeUserId, userState, initializeFetch] as const;
};
