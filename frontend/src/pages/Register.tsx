import { useState } from 'react';
import { useUser } from '../context/UserContext';
import useInput from '../hooks/useInput';
import InputBase from '../components/InputBase';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const username = useInput({
    id: 'usernameRegister',
    placeholder: 'Enter your username',
    required: true,
    autoComplete: 'username',
  });

  const password = useInput({
    id: 'passwordRegister',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
    autoComplete: 'new-password',
    minLength: '6',
  });

  const confirmPassword = useInput({
    type: 'password',
    id: 'confirmPassword',
    placeholder: 'Confirm your password',
    required: true,
    autoComplete: 'new-password',
    minLength: '6',
  });

  const [isRegistering, setIsRegistering] = useState(false);
  const { register } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsRegistering(true);

    if (password.value !== confirmPassword.value) {
      window.alert('Passwords do not match');
      setIsRegistering(false);
      return;
    }

    const result = await register({
      username: username.value,
      password: password.value,
    });

    if (result === 'ok') {
      navigate('/');
      setIsRegistering(false);
      return;
    }

    window.alert(result);
    setIsRegistering(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
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
        <h2 className="text-2xl font-bold mb-6">Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="usernameRegister"
              className="block text-gray-300 text-sm font-semibold mb-2"
            >
              Username
            </label>
            <InputBase props={username} />
          </div>

          <div className="mb-4">
            <label
              htmlFor="passwordRegister"
              className="block text-gray-300 text-sm font-semibold mb-2"
            >
              Password
            </label>
            <InputBase props={password} />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-300 text-sm font-semibold mb-2"
            >
              Confirm Password
            </label>
            <InputBase props={confirmPassword} />
          </div>

          <button
            type="submit"
            disabled={isRegistering}
            className={`w-full px-4 py-2 rounded-md text-white font-semibold mb-4
        ${
          isRegistering
            ? 'bg-purple-400 cursor-not-allowed'
            : 'bg-purple-600 hover:bg-purple-700'
        }`}
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm mb-2">Already have an account?</p>

          <button
            type="button"
            onClick={handleLoginClick}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Log in instead
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
