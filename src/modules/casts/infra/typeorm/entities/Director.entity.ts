import { Movie } from '@/modules/movies/infra/typeorm/entities/Movie.entity';
import { BaseEntity } from '@/shared/infra/typeorm/entities/Base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, DeleteDateColumn } from 'typeorm';

@Entity('directors')
export class Director extends BaseEntity {
  @ApiProperty({
    example: 'Joe Smith',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'M',
  })
  @Column()
  gender: string;

  @OneToMany(() => Movie, (movies) => movies.director)
  movies?: Movie[];

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
