import { Todo } from '../types/Types';

export default interface TodoResponse {
  message: string;
  todo: Todo;
}
