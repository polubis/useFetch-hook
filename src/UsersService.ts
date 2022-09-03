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
      id: `id: ${id}`,
      name: `User: ${id}`,
      email: `${id}@gmail.com`,
      avatar: `https://avatars.dicebear.com/api/open-peeps/user${id}.svg`,
    };
    id++;

    return { ...defaultUser, ...user };
  };

const createUser = createUserFactory();

let USERS: User[] = Array.from({ length: 10 }, () => createUser());

const delay = <T>(data: T, time = 1500, errorChance = 1): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldReject = Math.random() * 100 <= errorChance;

      if (shouldReject) reject(new Error("Something went wrong"));

      resolve(data);
    }, time);
  });
};

export const UsersService = {
  getMany: () => delay(USERS),
  addOne: (data: Omit<User, "id">) => {
    const newUser = createUser(data);
    USERS = [...USERS, newUser];
    return delay(newUser);
  },
};
