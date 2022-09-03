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
      {loading && <div>Loading users...</div>}
      {!loading && !!error && <div>{error}</div>}
      {!loading && !error && (
        <div>
          {users.map((user) => (
            <div key={user.id}>
              <figure>
                <img src={user.avatar} alt={user.name} />
              </figure>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
