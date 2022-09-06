import { AvatarsGrid, ErrorMessage } from "components";
import { useUsersFetch } from "useUsersFetch";
import css from "./App.module.scss";

function App() {
  const [usersState] = useUsersFetch();

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
