import {
  Controller,
  Get,
  Request,
  Put,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { UpdateUserDto } from '../../../dtos/UpdateUserDTO';
import { ShowProfileService } from '../../../services/ShowProfileService.service';
import { UpdateUserService } from '../../../services/UpdateUserService.service';
import { User } from '../../typeorm/entities/User.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('profile')
export class ProfileController {
  constructor(
    private readonly showProfileService: ShowProfileService,
    private readonly updateUserService: UpdateUserService,
  ) {}

  @Get()
  public async findOne(@Request() req: any): Promise<User> {
    const user = await this.showProfileService.execute({ userId: req.user.id });

    return user;
  }

  @Put()
  public async update(
    @Request() req: any,
    @Body() updateuserDto: UpdateUserDto,
  ): Promise<User> {
    const userId = req.user.id;
    const { email, name, password, oldPassword } = updateuserDto;

    const user = await this.updateUserService.execute({
      userId,
      oldPassword,
      password,
      name,
      email,
    });

    return user;
  }
}
