import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputBase from '../components/InputBase';
import useInput from '../hooks/useInput';
import { useUser } from '../context/UserContext';

const Login = () => {
  const [loggingIn, setLoggingIn] = useState(false);
  const { login } = useUser();

  const username = useInput({
    id: 'username',
    placeholder: 'Enter your username',
    required: true,
    autoComplete: 'username',
  });

  const password = useInput({
    id: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
    autoComplete: 'current-password',
    minLength: '6',
  });

  const navigate = useNavigate();

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoggingIn(true);

    const result = await login({
      username: username.value,
      password: password.value,
    });

    if (result === 'ok') {
      navigate('/');
      return;
    }

    window.alert(result);
    setLoggingIn(false);
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4">
      <Link
        to="/"
        className="absolute top-0 left-0 mt-2 ml-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
      >
        Home
      </Link>
      <div className="max-w-md w-full p-6 bg-gray-800 shadow-lg rounded-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-300 text-sm font-semibold mb-2"
            >
              Username
            </label>
            <InputBase props={username} />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-300 text-sm font-semibold mb-2"
            >
              Password
            </label>
            <InputBase props={password} />
          </div>

          <button
            type="submit"
            disabled={loggingIn}
            className={`w-full px-4 py-2 rounded-md text-white font-semibold mb-2
        ${
          loggingIn
            ? 'bg-purle-400 cursor-not-allowed'
            : 'bg-purple-600 hover:bg-purple-700'
        }`}
          >
            Login
          </button>

          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm mb-2">New User?</p>

            <button
              type="button"
              onClick={handleRegisterClick}
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
