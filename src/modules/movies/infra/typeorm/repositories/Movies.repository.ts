import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ICreateMovieDTO } from '../../../dtos/ICreateMovie.dto';
import { IMoviesRepository } from '../../../repositories/IMoviesRepository.interface';
import { Movie } from '../entities/Movie.entity';

@Injectable()
export class MoviesRepository implements IMoviesRepository {
  constructor(
    @InjectRepository(Movie)
    private repository: Repository<Movie>,
  ) {}

  async findById(id: string): Promise<Movie | undefined> {
    return this.repository.findOne(id);
  }

  async findByName(name: string): Promise<Movie | undefined> {
    return this.repository.findOne({
      where: {
        name,
      },
    });
  }

  async list(): Promise<Movie[]> {
    return this.repository.find({
      relations: ['genres', 'votes'],
    });
  }

  async create({
    name,
    description,
    author,
    duration,
    year,
    genres,
  }: ICreateMovieDTO): Promise<Movie> {
    const movie = this.repository.create({
      name,
      description,
      author,
      duration,
      year,
      genres,
    });

    await this.repository.save(movie);

    return movie;
  }
}
