import { CreateDirectorDTO } from '@/modules/casts/dtos/requests/CreateDirector.dto';
import { OptionsList } from '@/modules/casts/dtos/requests/OptionsToListData.dto';
import { IDirectorsRepository } from '@/modules/casts/repositories/DirectorsRepository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Director } from '../entities/Direction.entity';

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

  async list({ name, take, page }: OptionsList): Promise<Director[]> {
    const directorsQuery = await this.repository
      .createQueryBuilder('m')
      .take(take)
      .skip(take * (page - 1));

    if (name) {
      directorsQuery.andWhere(`m.name = :name`, { name });
    }

    const directors = await directorsQuery.getMany();

    return directors;
  }

  async create({ name, gender }: CreateDirectorDTO): Promise<Director> {
    const director = this.repository.create({
      name,
      gender,
    });

    await this.repository.save(director);

    return director;
  }
}