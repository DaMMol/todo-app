import knex from 'knex';
import config from '../../knexfile';

declare module 'knex/types/tables' {
  interface users {
    id: number;
    username: string;
    password: string;
  }

  interface todos {
    id: string;
    userId: string;
    title: string;
    notes: string | null;
    completed: boolean;
    createdAt: string;
  }
}

export const db = knex(config.development);
