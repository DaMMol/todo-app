import { db } from '../../utils/db';
import bcrypt from 'bcrypt';
import { UserInput, UserOutput } from '../../interfaces/User';

const salt = bcrypt.genSaltSync(12);

export const UserModel = {
  async findAll(): Promise<UserOutput[]> {
    return db('users').select(['id', 'username']);
  },

  async findById(id: string): Promise<UserOutput | undefined> {
    return db('users').where({ id }).first().select(['id', 'username']);
  },

  async create(data: UserInput): Promise<UserOutput> {
    const password = await bcrypt.hash(data.password, salt);
    const newUser: UserInput = {
      username: data.username,
      password: password,
    };
    const [user] = await db('users')
      .insert(newUser)
      .returning(['id', 'username']);

    return user;
  },

  async update(id: string, data: { password: string }): Promise<UserOutput> {
    const password = await bcrypt.hash(data.password, salt);
    const [user] = await db('users')
      .where({ id })
      .update({ password })
      .returning(['id', 'username']);

    return user;
  },

  async delete(id: string): Promise<UserOutput> {
    const [user] = await db('users')
      .where({ id })
      .del()
      .returning(['id', 'username']);
    return user;
  },
};
