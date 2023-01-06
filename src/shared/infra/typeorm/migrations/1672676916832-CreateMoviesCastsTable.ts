import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMoviesCastsTable1672676916832 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movies_cast',
        columns: [
          {
            name: 'actor_id',
            type: 'uuid',
          },
          {
            name: 'movie_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['actor_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'actors',
            name: 'FK_actor_movies',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['movie_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'movies',
            name: 'FK_movies_direction',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movies_cast');
  }
}
