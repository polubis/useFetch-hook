export interface User {
  id: string;
  name: string;
  email: string;
}

const createUser = (user: Partial<User> = {}): User => {
  const id = new Date().valueOf().toString();
  const defaultUser: User = {
    id: new Date().valueOf().toString(),
    name: `User: ${id}`,
    email: `${id}@gmail.com`,
  };

  return { ...defaultUser, ...user };
};

let USERS: User[] = Array.from({ length: 10 }, () => createUser());

const delay = <T>(data: T, time = 1500, errorChance = 50): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldReject = Math.random() * 100 >= errorChance;

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
