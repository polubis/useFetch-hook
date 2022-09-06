import { AvatarsGrid, ErrorMessage } from "components";
import { State } from "useFetch";
import { User } from "UsersService";
import css from "./UserDetails.module.scss";

interface UserDetailsProps {
  state: State<User>;
}

export const UserDetails = ({ state }: UserDetailsProps) => {
  return (
    <div className={css.layout}>
      {state.type === "pending" && <AvatarsGrid loading placeholders={1} />}
      {state.type === "fail" && <ErrorMessage error={state.error} />}
      {state.type === "done" && <div>{state.data.email}</div>}
    </div>
  );
};
