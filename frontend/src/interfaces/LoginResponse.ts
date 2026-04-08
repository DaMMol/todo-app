export default interface LoginResponse {
  token: string;
  user: {
    username: string;
    id: string;
  };
}
