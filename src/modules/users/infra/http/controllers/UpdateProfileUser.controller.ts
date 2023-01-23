import { USERS } from '@/config/constants/resourceTags.constants';
import {
  BAD_REQUEST_RESPONSE,
  CONFLICT_RESPONSE,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_RESPONSE,
  OK_RESPONSE,
  UNAUTHORIZED_RESPONSE,
} from '@/config/constants/responses.constant';
import { UpdateUserDTO } from '@/modules/users/dtos/requests/UpdateUser.dto';
import { UpdateUserService } from '@/modules/users/services/UpdateUser.service';
import { ExceptionErrorDTO } from '@/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from '@/shared/errors/dtos/validationError.dto';
import { JwtAuthGuard } from '@/shared/infra/http/guards/jwtAuth.guard';
import {
  Controller,
  Request,
  HttpCode,
  HttpStatus,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { classToClass } from 'class-transformer';

import { User } from '../../typeorm/entities/User.entity';

@ApiTags(USERS)
@Controller('profile')
export class UpdateProfileUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: User,
    description: OK_RESPONSE,
  })
  @ApiBadRequestResponse({
    type: ValidationErrorDTO,
    description: BAD_REQUEST_RESPONSE,
  })
  @ApiUnauthorizedResponse({
    type: ValidationErrorDTO,
    description: UNAUTHORIZED_RESPONSE,
  })
  @ApiNotFoundResponse({
    type: ExceptionErrorDTO,
    description: NOT_FOUND_RESPONSE,
  })
  @ApiConflictResponse({
    type: ExceptionErrorDTO,
    description: CONFLICT_RESPONSE,
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: INTERNAL_SERVER_ERROR,
  })
  @UseGuards(JwtAuthGuard)
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
