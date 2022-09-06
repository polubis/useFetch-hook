export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

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
  getMany: async (signal: AbortController["signal"]) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      signal,
    });
    const users = (await response.json()) as Omit<User, "avatar">[];

    return delay(
      users.map(
        (user): User => ({
          ...user,
          avatar: `https://avatars.dicebear.com/api/open-peeps/user${user.id}.svg`,
        })
      )
    );
  },
};
