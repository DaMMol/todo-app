interface Todo {
  id: string;
  userId: string;
  title: string;
  notes: string | null;
  completed: boolean;
  createdAt: string;
}

interface TodoInput {
  userId: string;
  title: string;
  notes: string | null;
  completed: boolean;
}

interface TodoUpdateInput {
  title?: string;
  notes?: string | null;
  completed?: boolean;
}

export { Todo, TodoInput, TodoUpdateInput };
