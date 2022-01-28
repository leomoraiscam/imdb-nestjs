import {
  Controller,
  Get,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
  Put,
  Body,
} from '@nestjs/common';
import { UpdateUserDto } from 'src/modules/users/dtos/UpdateUserDTO';
import { UpdateUserService } from 'src/modules/users/services/UpdateUserService.service';

import { JwtAuthGuard } from '../../../../../shared/infra/http/guards/jwtAuth.guard';
import { ShowProfileService } from '../../../services/ShowProfileService.service';
import { User } from '../../typeorm/entities/User.entity';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly showProfileService: ShowProfileService,
    private readonly updateUserService: UpdateUserService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
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
