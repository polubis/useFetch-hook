import { useState } from "react";
import { createAccount, CreateAccountPayload } from "./createAccountService";

const STATUS = ["IDLE", "PENDING", "OK", "FAIL"] as const;

export const useAccountCreator = () => {
  const [status, setStatus] = useState(STATUS[0] as typeof STATUS[number]);

  const create = async (payload: CreateAccountPayload) => {
    setStatus("PENDING");

    try {
      await createAccount(payload);
      setStatus("OK");
    } catch {
      setStatus("FAIL");
    }
  };

  return { pending: status === "PENDING", ok: status === "OK", create };
};
