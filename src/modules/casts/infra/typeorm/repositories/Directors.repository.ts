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
}
