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
import { ApiTags, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { classToClass } from 'class-transformer';
import { UpdateUserDTO } from 'src/modules/users/dtos/UpdateUser.dto';
import { UpdateUserService } from 'src/modules/users/services/UpdateUser.service';
import { ExceptionErrorDTO } from 'src/shared/errors/dtos/exceptionError.dto';

import { JwtAuthGuard } from '../../../../../shared/infra/http/guards/jwtAuth.guard';
import { ShowProfileService } from '../../../services/ShowProfile.service';
import { User } from '../../typeorm/entities/User.entity';

@ApiTags('Users')
@Controller('profile')
export class ProfileController {
  constructor(
    private readonly showProfileService: ShowProfileService,
    private readonly updateUserService: UpdateUserService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse({
    type: ExceptionErrorDTO,
    description:
      'This will be returned when the interest to be deleted does not exist',
  })
  @UseGuards(JwtAuthGuard)
  public async findOne(@Request() req: any): Promise<User> {
    const user = await this.showProfileService.execute({ userId: req.user.id });

    return classToClass(user);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse({
    type: ExceptionErrorDTO,
    description:
      'This will be returned when the interest to be deleted does not exist',
  })
  public async update(
    @Request() req: any,
    @Body() updateUserDTO: UpdateUserDTO,
  ): Promise<User> {
    const userId = req.user.id;
    const { email, name, password, oldPassword } = updateUserDTO;

    const user = await this.updateUserService.execute({
      userId,
      oldPassword,
      password,
      name,
      email,
    });

    return classToClass(user);
  }
}
