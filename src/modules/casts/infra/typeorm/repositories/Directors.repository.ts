import { CreateDirectorsDTO } from '@/modules/casts/dtos/requests/CreateDirectors.dto';
import { ListCastsDTO } from '@/modules/casts/dtos/requests/ListCasts.dto';
import { IDirectorsRepository } from '@/modules/casts/repositories/DirectorsRepository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Director } from '../entities/Director.entity';

@Injectable()
export class DirectorsRepository implements IDirectorsRepository {
  constructor(
    @InjectRepository(Director)
    private repository: Repository<Director>,
  ) {}

  async findById(id: string): Promise<Director> {
    return this.repository.findOne(id);
  }

  async findByName(name: string): Promise<Director> {
    return this.repository.findOne({
      where: {
        name,
      },
    });
  }

  async list({ name, page, perPage }: ListCastsDTO): Promise<Director[]> {
    const directorsQuery = await this.repository
      .createQueryBuilder('director')
      .take(perPage)
      .skip(perPage * (page - 1));

    if (name) {
      directorsQuery.andWhere(`director.name like :name`, {
        name: `%${name}%`,
      });
    }

    const directors = await directorsQuery.getMany();

    return directors;
  }

  async create({ name, gender }: CreateDirectorsDTO): Promise<Director> {
    const director = this.repository.create({
      name,
      gender,
    });

    await this.repository.save(director);

    return director;
  }

  async save(director: Director): Promise<Director> {
    return this.repository.save(director);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
