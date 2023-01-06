import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddDirectionIdInMoviesTable1672679274487
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'movies',
      new TableColumn({
        name: 'director_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'movies',
      new TableForeignKey({
        name: 'FK_director_movies',
        referencedTableName: 'directors',
        referencedColumnNames: ['id'],
        columnNames: ['director_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('movies', 'FK_director_movies');
    await queryRunner.dropColumn('movies', 'director_id');
  }
}
