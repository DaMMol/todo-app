import type { Knex } from 'knex';
import { types } from 'pg';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './migrations',
    },
  },
};

// Don't convert timestamp values to JS Date instances (instead return as strings)
// Also see: https://github.com/brianc/node-pg-types/issues/50#issuecomment-374412688
const TYPE_TIMESTAMP = 1114;
const TYPE_TIMESTAMPTZ = 1184;
const TYPE_DATESTAMP = 1082;
types.setTypeParser(TYPE_TIMESTAMP, (value) => value);
types.setTypeParser(TYPE_TIMESTAMPTZ, (value) => value);
types.setTypeParser(TYPE_DATESTAMP, (value) => value);

export default config;
