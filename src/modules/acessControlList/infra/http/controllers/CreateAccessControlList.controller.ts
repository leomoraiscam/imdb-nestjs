import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { User } from 'src/modules/users/infra/typeorm/entities/User.entity';
import { ExceptionErrorDTO } from 'src/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from 'src/shared/errors/dtos/validationError.dto';

import { ICreateACLToUserRequestDTO } from '../../../dtos/http/requests/ICreateAccessControllListToUserRequest.dto';
import { ICreateACLToUserResponseDTO } from '../../../dtos/http/responses/ICreateAccessControllListToUserResponse.dto';
import { CreateAccessControlListToUserService } from '../../../services/CreateAccessControlListToUser.service';

@ApiTags('Access Control List')
@Controller('users/:user_id/acl')
export class CreateUserAccessControlListController {
  constructor(
    private readonly createAccessControlListToUserService: CreateAccessControlListToUserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: ICreateACLToUserResponseDTO,
    description: 'This will be returned when the created access to user',
  })
  @ApiBadRequestResponse({
    type: ValidationErrorDTO,
    description: 'This will be returned when has validation error',
  })
  @ApiNotFoundResponse({
    type: ExceptionErrorDTO,
    description:
      'This will be returned when the user, role or permission to be deleted does not exist',
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: 'This will be returned when an unexpected error occurs',
  })
  async handle(
    @Param('id') user_id: string,
    @Body() { permissions, roles }: ICreateACLToUserRequestDTO,
  ): Promise<User> {
    const createACLToUsers =
      await this.createAccessControlListToUserService.execute({
        user_id,
        permissions,
        roles,
      });

    return plainToClass(User, createACLToUsers);
  }
}
