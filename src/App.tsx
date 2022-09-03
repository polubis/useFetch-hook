import { AvatarsGrid } from "components";
import { useEffect, useState } from "react";
import { User, UsersService } from "UsersService";
import css from "./App.module.scss";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const handleUsersLoad = async () => {
    setLoading(true);
    setError("");
    setUsers([]);

    try {
      const users = await UsersService.getMany();

      setLoading(false);
      setError("");
      setUsers(users);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLoading(false);
        setError(error.message);
        setUsers([]);
      }
    }
  };

  useEffect(() => {
    handleUsersLoad();
  }, []);

  return (
    <div className={css.layout}>
      {loading && <AvatarsGrid loading />}
      {!loading && !!error && <div>{error}</div>}
      {!loading && !error && (
        <AvatarsGrid>
          {users.map((user) => (
            <img key={user.id} src={user.avatar} alt={user.name} />
          ))}
        </AvatarsGrid>
      )}
    </div>
  );
}

export default App;
