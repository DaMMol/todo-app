import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Todo, TodoInput, TodoUpdateInput } from '../types/Types';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../services/TodoService';

interface TodoContextProps {
  todos: Todo[];
  todoCreate: (newTodo: TodoInput, token: string) => Promise<void>;
  todoUpdate: (newTodo: TodoUpdateInput, token: string) => Promise<void>;
  todoDelete: (id: string, token: string) => Promise<void>;
  getAllTodos: (token: string) => Promise<void>;
}

interface TodoProviderProps {
  children: ReactNode;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useTodoContext = (): TodoContextProps => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodoList] = useState<Todo[]>([]);

  const todoCreate = async (newTodo: TodoInput, token: string) => {
    const todoResponse = await createTodo(newTodo, token);
    if (todoResponse) {
      setTodoList((prevTodos) => [...prevTodos, todoResponse.todo]);
    }
  };

  const todoUpdate = async (newTodo: TodoUpdateInput, token: string) => {
    const todoResponse = await updateTodo(newTodo, token);
    if (todoResponse) {
      setTodoList((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoResponse.todo.id ? todoResponse.todo : todo,
        ),
      );
    }
  };

  const todoDelete = async (id: string, token: string) => {
    const todoResponse = await deleteTodo(id, token);
    if (todoResponse) {
      setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }
  };

  const getAllTodos = async (token: string) => {
    const todos: Todo[] = (await getTodos(token))!;
    setTodoList([...todos]);
  };

  const contextValue: TodoContextProps = {
    todos,
    todoCreate,
    todoUpdate,
    todoDelete,
    getAllTodos,
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
