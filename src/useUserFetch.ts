import { useFetch } from "useFetch";
import { useEffect, useState } from "react";
import { User, UsersService } from "UsersService";

export const useUserFetch = () => {
  const [activeUserId, setActiveUserId] = useState<User["id"] | null>(null);
  const [userState, fetchUser, abort] = useFetch<User>();

  const initializeFetch = (id: User["id"]) => {
    setActiveUserId(id);
  };

  const handleUserFetch = (id: User["id"]) => {
    fetchUser((signal) => UsersService.getOne(signal, id));
  };

  useEffect(() => {
    activeUserId !== null && handleUserFetch(activeUserId);

    return () => {
      abort();
    };
  }, [activeUserId]);

  return [activeUserId, userState, initializeFetch] as const;
};
