import { AvatarsGrid, ErrorMessage } from "components";
import { useEffect } from "react";
import { useUsersFetch } from "useUsersFetch";
import css from "./App.module.scss";

function App() {
  const [usersState, fetchUsers] = useUsersFetch();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={css.layout}>
      {usersState.type === "pending" && <AvatarsGrid loading />}
      {usersState.type === "fail" && <ErrorMessage error={usersState.error} />}
      {usersState.type === "done" && (
        <AvatarsGrid>
          {usersState.data.map((user) => (
            <img key={user.id} src={user.avatar} alt={user.name} />
          ))}
        </AvatarsGrid>
      )}
    </div>
  );
}

export default App;
