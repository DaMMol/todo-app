import TodoResponse from '../interfaces/TodoResponse';
import { Todo } from '../types/Types';

const getTodos = async (token: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/todos`,
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

    const data: Todo[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const createTodo = async (
  todo: { title: string; notes: string | null; completed: boolean },
  token: string,
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/todos`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: todo.title,
          notes: todo.notes,
          completed: todo.completed,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: TodoResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateTodo = async (
  todo: {
    id: string;
    title?: string;
    notes?: string | null;
    completed?: boolean;
  },
  token: string,
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/todos/${todo.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: todo.title,
          notes: todo.notes,
          completed: todo.completed,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: TodoResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const deleteTodo = async (id: string, token: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/todos/${id}`,
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

    const data: TodoResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getTodos, createTodo, updateTodo, deleteTodo };
