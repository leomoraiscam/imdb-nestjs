import { IActorsRepository } from '@/modules/casts/repositories/ActorsRepository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Actor } from '../entities/Actor.entity';

@Injectable()
export class ActorsRepository implements IActorsRepository {
  constructor(
    @InjectRepository(Actor)
    private repository: Repository<Actor>,
  ) {}

  async findByIds(ids: string[]): Promise<Actor[]> {
    return this.repository.findByIds(ids);
  }
}
