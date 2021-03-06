import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ICreateMovieDTO } from '../../../dtos/ICreateMovie.dto';
import { OptionsList } from '../../../dtos/IOptionsToListMovie.dto';
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

  async list({
    name,
    author,
    genre_id,
    take,
    page,
  }: OptionsList): Promise<Movie[]> {
    const moviesQuery = await this.repository
      .createQueryBuilder('m')
      .leftJoinAndSelect('m.genres', 'movies_genres')
      .leftJoinAndSelect('m.votes', 'votes')
      .take(take)
      .skip(take * (page - 1));

    if (name) {
      moviesQuery.andWhere(`m.name = :name`, { name });
    }

    if (author) {
      moviesQuery.andWhere(`m.author = :author`, { author });
    }

    if (genre_id) {
      moviesQuery
        .innerJoin('m.genres', 'movies_genres')
        .where('movies_genres.id = :genre_id', { genre_id });
    }

    const movies = await moviesQuery.getMany();

    return movies;
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
