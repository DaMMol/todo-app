interface User {
  id: string;
  username: string;
  password: string;
}

interface UserOutput {
  id: string;
  username: string;
}

interface UserInput {
  username: string;
  password: string;
}

interface LoginUser {
  id: string;
  username: string;
}

interface TokenContent {
  token: string;
  user: LoginUser;
}

interface UserTest extends Partial<User> {}

export { User, UserOutput, UserInput, LoginUser, TokenContent, UserTest };
