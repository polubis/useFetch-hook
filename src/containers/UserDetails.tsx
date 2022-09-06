import { Avatar, ErrorMessage } from "components";
import { Button } from "ui";
import { State } from "useFetch";
import { User } from "UsersService";
import css from "./UserDetails.module.scss";

interface UserDetailsProps {
  state: State<User>;
  onBack: () => void;
}

export const UserDetails = ({ state, onBack }: UserDetailsProps) => {
  return (
    <div className={css.layout}>
      {state.type === "pending" && <Avatar className={css.placeholder} />}
      {state.type === "fail" && <ErrorMessage error={state.error} />}
      {state.type === "done" && (
        <div className={css.details}>
          <Avatar>
            <img src={state.data.avatar} alt={state.data.name} />
          </Avatar>
          <div>
            <b>Id: </b>
            <span>{state.data.id}</span>
          </div>
          <div>
            <b>Email: </b>
            <span>{state.data.email}</span>
          </div>
          <div>
            <b>Name: </b>
            <span>{state.data.name}</span>
          </div>
        </div>
      )}
      <footer>
        <Button onClick={onBack}>Back</Button>
      </footer>
    </div>
  );
};
