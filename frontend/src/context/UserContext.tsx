import { createContext, useContext, useState, ReactNode } from 'react';
import {
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
  checkToken,
} from '../services/UserService';

interface UserData {
  user: {
    username: string;
    id: string;
  };
  token: string;
}

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  password: string;
}

interface UpdateData {
  username?: string;
  password?: string;
}

interface UserContextProps {
  userState: UserData | null;
  login: (userData: LoginData) => Promise<string>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<string>;
  userUpdate: (userData: UpdateData) => Promise<string>;
  userDelete: () => Promise<string>;
  userCheckToken: () => Promise<string>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userState, setUser] = useState<UserData | null>(() => {
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? (JSON.parse(storedUser) as UserData) : null;
  });

  const login = async (userData: LoginData) => {
    const response = await loginUser(userData);
    if (response) {
      const data = {
        token: response.token,
        user: response.user,
      };
      setUser(data);

      // Save user data to session storage
      sessionStorage.setItem('user', JSON.stringify(data));
      return 'ok';
    }
    return 'username or password incorrect';
  };

  const logout = () => {
    setUser(null);

    // Clear user data from session storage
    sessionStorage.removeItem('user');
  };

  const register = async (userData: RegisterData) => {
    const response = await registerUser(userData);
    if (response) {
      const { username, password } = userData;
      await login({ username: username, password });
      return 'ok';
    }
    return 'username already in use';
  };

  const userUpdate = async (userData: UpdateData) => {
    const response = await updateUser(userData, userState!.token);
    if (response) {
      return 'ok';
    }
    return 'something went wrong, please try again later';
  };

  const userDelete = async () => {
    const response = await deleteUser(userState!.token);
    if (response) {
      logout();
      return 'ok';
    }
    return 'something went wrong, please try again later';
  };

  const userCheckToken = async () => {
    const response = await checkToken(userState!.token);
    if (response) {
      return 'ok';
    }
    return 'something went wrong, please try again later';
  };

  const contextValue: UserContextProps = {
    userState,
    login,
    logout,
    register,
    userUpdate,
    userDelete,
    userCheckToken,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
