export interface CreateAccountPayload {
  username: string;
  email: string;
  password: string;
  repeatedPassword: string;
  position: string;
  company: string;
  commercial: boolean;
  regulations: boolean;
}

export const createAccount = (
  payload: CreateAccountPayload
): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};
