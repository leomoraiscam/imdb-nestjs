import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMovieGenresTable1644780060137 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movies_genres',
        columns: [
          {
            name: 'movie_id',
            type: 'uuid',
          },
          {
            name: 'genre_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['movie_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'movies',
            name: 'FK_movies_genres',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['genre_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'genres',
            name: 'FK_genres_movies',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movies_genres');
  }
}
