type Todo = {
  id: string;
  userId: string;
  title: string;
  notes: string | null;
  completed: boolean;
  createdAt: string;
};

type TodoInput = {
  title: string;
  notes: string | null;
  completed: boolean;
};

type TodoUpdateInput = {
  id: string;
  title?: string;
  notes?: string | null;
  completed?: boolean;
};

export type { Todo, TodoInput, TodoUpdateInput };
