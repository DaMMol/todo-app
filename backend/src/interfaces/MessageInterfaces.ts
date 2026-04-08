import { UserOutput } from './User';

interface MessageResponse {
  message: string;
}

interface ErrorResponse extends MessageResponse {
  stack?: string;
}

interface UserResponse extends MessageResponse {
  user: UserOutput;
}

interface LoginResponse {
  token: string;
  user: UserOutput;
}

export { MessageResponse, ErrorResponse, UserResponse, LoginResponse };
