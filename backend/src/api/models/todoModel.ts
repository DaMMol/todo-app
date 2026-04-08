import { db } from '../../utils/db';
import { Todo, TodoInput, TodoUpdateInput } from '../../interfaces/Todo';

export const TodoModel = {
  async findAll(userId: string): Promise<Todo[]> {
    return db('todos')
      .where('userId', userId)
      .select(['id', 'userId', 'title', 'notes', 'completed', 'createdAt']);
  },

  async findById(id: string): Promise<Todo | undefined> {
    return db('todos')
      .where({ id })
      .first()
      .select(['id', 'userId', 'title', 'notes', 'completed', 'createdAt']);
  },

  async create(data: TodoInput): Promise<Todo> {
    const [todo] = await db('todos')
      .insert(data)
      .returning(['id', 'userId', 'title', 'notes', 'completed', 'createdAt']);

    return todo;
  },

  async update(id: string, data: TodoUpdateInput): Promise<Todo> {
    const [todo] = await db('todos')
      .where('id', id)
      .update(data)
      .returning(['id', 'userId', 'title', 'notes', 'completed', 'createdAt']);

    return todo;
  },

  async delete(id: string): Promise<Todo> {
    const [todo] = await db('todos')
      .where({ id })
      .del()
      .returning(['id', 'userId', 'title', 'notes', 'completed', 'createdAt']);

    return todo;
  },
};
