import LoginResponse from '../interfaces/LoginResponse';
import UserResponse from '../interfaces/UserResponse';

const loginUser = async (credentials: {
  username: string;
  password: string;
}): Promise<LoginResponse | undefined> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const registerUser = async (user: { username: string; password: string }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/users`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: UserResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async (
  user: {
    username?: string;
    password?: string;
  },
  token: string,
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/users`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: UserResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (token: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/users`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: UserResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const checkToken = async (token: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/users/token`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: UserResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { loginUser, registerUser, updateUser, deleteUser, checkToken };
