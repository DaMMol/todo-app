import { Link, useNavigate } from 'react-router-dom';
import InputBase from '../components/InputBase';
import useInput from '../hooks/useInput';
import { useUser } from '../context/UserContext';
import { useState } from 'react';

const Settings = () => {
  const { userUpdate, userDelete } = useUser();
  const [isUpdating, setIsUpdating] = useState(false);

  const password = useInput({
    id: 'password',
    type: 'password',
    placeholder: 'Enter your password',
  });

  const confirmPassword = useInput({
    id: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm your password',
  });

  const navigate = useNavigate();

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUpdating(true);

    if (password.value !== confirmPassword.value) {
      console.error('Passwords do not match');
      setIsUpdating(false);
      return;
    }

    const result = await userUpdate({ password: password.value });

    if (result === 'ok') {
      navigate('/');
    } else {
      window.alert(result);
    }

    setIsUpdating(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Do you really want to delete user?')) {
      setIsUpdating(true);

      const result = await userDelete();

      if (result === 'ok') {
        navigate('/');
      } else {
        window.alert(result);
      }

      setIsUpdating(false);
    }
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
        <h2 className="text-2xl font-bold mb-6">Settings</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="password"
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
            disabled={isUpdating}
            className={`w-full px-4 py-2 rounded-md text-white font-semibold mb-4
        ${
          isUpdating
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
          >
            {isUpdating ? 'Updating...' : 'Update password'}
          </button>
        </form>

        <button
          type="button"
          disabled={isUpdating}
          onClick={handleDelete}
          className={`w-full px-4 py-2 rounded-md text-white font-semibold
      ${
        isUpdating
          ? 'bg-purple-400 cursor-not-allowed'
          : 'bg-purple-600 hover:bg-purple-700'
      }`}
        >
          Delete user
        </button>
      </div>
    </div>
  );
};

export default Settings;
