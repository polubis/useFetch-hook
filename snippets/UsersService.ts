export const UsersService = {
  getMany: async (signal: Signal) => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/photos",
      {
        signal,
      }
    );
    // --- Rest of implementation. ---
  },
};
