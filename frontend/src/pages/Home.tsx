import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CreateTodo from '../components/CreateTodo';
import TodoComponent from '../components/TodoComponent';
import { useTodoContext } from '../context/TodoContext';
import { useUser } from '../context/UserContext';

const Home = () => {
  const { todos, todoCreate, getAllTodos } = useTodoContext();
  const [showCreateTodoBox, setShowCreateTodoBox] = useState(false);
  const { userState, logout, userCheckToken } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (!userState?.token) return;

      const result = await userCheckToken();
      if (result !== 'ok') {
        console.log('Token invalid or expired, logging out');
        logout();
        return;
      }

      await getAllTodos(userState.token);
    };

    fetchData();
  }, [userState?.token, getAllTodos, logout, userCheckToken]);

  const handleCreateTodo = () => setShowCreateTodoBox((prev) => !prev);

  const handleCreateTodoSubmit = async (
    title: string,
    notes: string | null,
  ) => {
    const newTodo = { title, notes, completed: false };
    await todoCreate(newTodo, userState!.token);
    setShowCreateTodoBox(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="flex flex-col items-center justify-center pt-8">
        <h1 className="text-5xl font-sans mb-6 text-center">asdasd</h1>
        {!userState ? (
          <Link to="/login">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
              Login
            </button>
          </Link>
        ) : (
          <div className="flex gap-2">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
              onClick={logout}
            >
              Logout
            </button>

            <Link to="/settings">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                Settings
              </button>
            </Link>
          </div>
        )}
      </div>
      {userState && (
        <main className="mt-12 bg-gray-800 p-8 rounded-lg max-w-3xl mx-auto shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">What To-Do?</h2>

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              onClick={handleCreateTodo}
            >
              New Todo
            </button>
          </div>

          {showCreateTodoBox && (
            <CreateTodo
              onSubmit={handleCreateTodoSubmit}
              onClose={() => setShowCreateTodoBox(false)}
            />
          )}
          <div className="space-y-2">
            {todos.length === 0 ? (
              <p className="text-gray-400">No todos yet.</p>
            ) : (
              [...todos]
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
                )
                .map((todo) => <TodoComponent key={todo.id} todo={todo} />)
            )}
          </div>
        </main>
      )}
    </div>
  );
};
export default Home;
