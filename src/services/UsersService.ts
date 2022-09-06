import { Signal } from "utils";

interface ResponseObject {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

const createUserFactory =
  (id = 0) =>
  (user: Partial<User> = {}): User => {
    const defaultUser: User = {
      id: `${id}`,
      name: `User${id}`,
      email: `${id}@gmail.com`,
      avatar: `https://avatars.dicebear.com/api/open-peeps/user${id}.svg`,
    };
    id++;

    return { ...defaultUser, ...user };
  };

const createUser = createUserFactory();

export const UsersService = {
  getMany: async (signal: Signal) => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/photos",
      {
        signal,
      }
    );

    if (response.status < 200 || response.status >= 400) {
      return Promise.reject(new Error("Error"));
    }

    const users = (await response.json()) as ResponseObject[];

    return users.slice(0, 100).map(() => createUser());
  },
  getOne: async (signal: Signal, id: User["id"]): Promise<User> => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos/${id}`,
      {
        signal,
      }
    );

    if (response.status < 200 || response.status >= 400) {
      return Promise.reject(new Error("Error"));
    }

    await response.json();

    return createUser();
  },
};
