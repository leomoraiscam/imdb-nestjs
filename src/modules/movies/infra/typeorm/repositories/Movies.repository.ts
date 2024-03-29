import { ICreateMoviesDTO } from '@/modules/movies/dtos/ICreateMovies.dto';
import { ListMoviesDTO } from '@/modules/movies/dtos/requests/ListMovies.dto';
import { IMoviesRepository } from '@/modules/movies/repositories/IMoviesRepository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    genreIds,
    page,
    perPage,
    keyword,
  }: ListMoviesDTO): Promise<Movie[]> {
    const moviesQuery = await this.repository
      .createQueryBuilder('m')
      .leftJoinAndSelect('m.genres', 'movies_genres')
      .leftJoinAndSelect('m.votes', 'votes')
      .leftJoinAndSelect('m.actors', 'actors')
      .leftJoinAndSelect('m.director', 'directors')
      .take(perPage)
      .skip(perPage * (page - 1));

    if (name) {
      moviesQuery.andWhere(`m.name = :name`, { name });
    }

    if (author) {
      moviesQuery.andWhere(`m.author = :author`, { author });
    }

    if (keyword) {
      moviesQuery.andWhere(`m.name like :name`, { name: `%${keyword}%` });
    }

    if (genreIds) {
      moviesQuery
        .innerJoin('m.genres', 'movies_genres')
        .where('movies_genres.id = :genre_id', { genreIds });
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
    actors,
    directorId,
  }: ICreateMoviesDTO): Promise<Movie> {
    const movie = this.repository.create({
      name,
      description,
      author,
      duration,
      year,
      genres,
      actors,
      directorId,
    });

    await this.repository.save(movie);

    return movie;
  }

  async save(movie: Movie): Promise<Movie> {
    return this.repository.save(movie);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
