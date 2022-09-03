import { Fns, useForm, required, minLength, maxLength } from "libs/form";
import { FormEvent, useState } from "react";
import { Alert, Backdrop, Button, InputField } from "ui";

import css from "./ChangePassword.module.scss";

const VALUES = {
  oldPassword: "",
  newPassword: "",
  confirmedNewPassword: "",
};

const PASSWORD_VALIDATORS = [required(), minLength(4), maxLength(16)];
const PASSWORDS_DIFFERENT_MESSAGE =
  "New password and confirmed password must be same";

const VALIDATORS: Fns<typeof VALUES> = {
  oldPassword: PASSWORD_VALIDATORS,
  newPassword: [
    ...PASSWORD_VALIDATORS,
    (value, values) =>
      value !== values.confirmedNewPassword ? PASSWORDS_DIFFERENT_MESSAGE : "",
  ],
  confirmedNewPassword: [
    ...PASSWORD_VALIDATORS,
    (value, values) =>
      value !== values.newPassword ? PASSWORDS_DIFFERENT_MESSAGE : "",
  ],
};

type Status = "IDLE" | "PENDING" | "ERROR" | "SUCCESS";

const mockedPostRequest = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 1500);
  });
};

export const ChangePassword = () => {
  const [status, setStatus] = useState<Status>("IDLE");
  const { values, errors, change, invalid, valid, reset, submit } = useForm(
    VALUES,
    VALIDATORS
  );

  const handleClose = (): void => {
    reset();
    setStatus("IDLE");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    submit(e);

    if (valid && status === "IDLE") {
      setStatus("PENDING");

      try {
        await mockedPostRequest();
        setStatus("SUCCESS");
      } catch {
        setStatus("ERROR");
      }
    }
  };

  const pending = status === "PENDING";

  return (
    <div className={css.changePassword}>
      <h3>Change password</h3>

      {pending && <Backdrop />}

      <form onSubmit={handleSubmit}>
        <InputField
          name="oldPassword"
          label="Old password *"
          type="password"
          placeholder="Old password..."
          error={errors.oldPassword}
          value={values.oldPassword}
          onChange={change}
        />

        <InputField
          name="newPassword"
          type="password"
          label="New password *"
          placeholder="New password..."
          error={errors.newPassword}
          value={values.newPassword}
          onChange={change}
        />

        <InputField
          name="confirmedNewPassword"
          type="password"
          label="Confirm new password *"
          placeholder="Confirm new password..."
          error={errors.confirmedNewPassword}
          value={values.confirmedNewPassword}
          onChange={change}
        />

        {status !== "SUCCESS" && (
          <footer>
            <Button
              theme="primaryTransparent"
              type="button"
              disabled={pending}
              onClick={reset}
            >
              RESET
            </Button>

            <Button type="submit" disabled={invalid || pending}>
              SUBMIT PASSWORD
            </Button>
          </footer>
        )}
        {status === "SUCCESS" && (
          <Alert
            id={1}
            className={css.alert}
            type="success"
            message="Password changed"
            onClose={handleClose}
          />
        )}
      </form>
    </div>
  );
};
