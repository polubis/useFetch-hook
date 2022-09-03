import { email, Fns, maxLength, minLength, required } from "libs/form";

export const ACCOUNT_SETUP_VALUES = {
  username: "",
  email: "",
  password: "",
  repeatedPassword: "",
};

const passwordsEqual =
  () =>
  (value: string, values: typeof ACCOUNT_SETUP_VALUES): string =>
    values.password !== values.repeatedPassword ? "Different passwords" : "";

export const ACCOUNT_SETUP_VALIDATORS: Fns<typeof ACCOUNT_SETUP_VALUES> = {
  username: [required(), minLength(6), maxLength(15)],
  email: [required(), email()],
  password: [required(), minLength(6), maxLength(15), passwordsEqual()],
  repeatedPassword: [required(), minLength(6), maxLength(15), passwordsEqual()],
};

export const WORK_COMPANY_VALUES = {
  position: "",
  company: "",
};

export const WORK_COMPANY_VALIDATORS: Fns<typeof WORK_COMPANY_VALUES> = {
  position: [minLength(2), maxLength(30)],
  company: [minLength(2), maxLength(50)],
};

export const ALMOST_DONE_VALUES = {
  regulations: false,
  commercial: false,
};

export const ALMOST_DONE_VALIDATORS: Fns<typeof ALMOST_DONE_VALUES> = {
  regulations: [(value) => (value ? "" : "Regulations must be accepted")],
};
