import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const primaryUuid = (table: Knex.CreateTableBuilder, name: string) => {
    table
      .uuid(name)
      .primary()
      .defaultTo(knex.raw('gen_random_uuid()'))
      .notNullable();
  };

  await knex.schema.createTable('users', (table) => {
    primaryUuid(table, 'id');

    table.string('username').notNullable().unique();

    table.string('password').notNullable();
  });

  await knex.schema.createTable('todos', (table) => {
    primaryUuid(table, 'id');

    table
      .uuid('userId')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.string('title').notNullable();

    table.string('notes').nullable();

    table.boolean('completed').notNullable();

    table
      .timestamp('createdAt')
      .notNullable()
      .defaultTo(knex.raw('current_timestamp'));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('todos');
  await knex.schema.dropTableIfExists('users');
}
