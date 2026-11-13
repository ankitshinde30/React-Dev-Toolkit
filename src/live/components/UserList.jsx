import useFetch from '../hooks/useFetch';
import Loader from './Loader';

export default function UserList() {
  const { data, error, loading, refetch } = useFetch(import.meta.env.VITE_API_URL + '/users');

  if (loading) return <Loader label="Loading users" />;
  if (error) {
    return (
      <div role="alert">
        <p>Could not load users. {error.message}</p>
        <button type="button" className="btn btn--outline" onClick={refetch}>
          Try again
        </button>
      </div>
    );
  }
  if (!data || data.length === 0) return <p>No users yet.</p>;

  return (
    <ul role="list">
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
