export default interface UserResponse {
  message: string;
  user: {
    id: string;
    username: string;
  };
}
