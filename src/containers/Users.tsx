import { AvatarsGrid, ErrorMessage } from "components";
import { State } from "useFetch";
import { User } from "UsersService";
import css from "./Users.module.scss";

interface UsersProps {
  state: State<User[]>;
  onItemClick: (id: User["id"]) => void;
}

export const Users = ({ state, onItemClick }: UsersProps) => {
  return (
    <div className={css.layout}>
      {state.type === "pending" && <AvatarsGrid loading />}
      {state.type === "fail" && <ErrorMessage error={state.error} />}
      {state.type === "done" && (
        <AvatarsGrid>
          {state.data.map((user) => (
            <img
              key={user.id}
              src={user.avatar}
              alt={user.name}
              onClick={() => onItemClick(user.id)}
            />
          ))}
        </AvatarsGrid>
      )}
    </div>
  );
};
