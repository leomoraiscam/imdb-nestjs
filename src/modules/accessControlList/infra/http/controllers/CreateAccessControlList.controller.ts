import { CreateACLToUserRequestDTO } from '@/modules/accessControlList/dtos/http/requests/CreateAccessControlListToUserRequest.dto';
import { CreateACLToUserResponseDTO } from '@/modules/accessControlList/dtos/http/responses/CreateAccessControlListToUserResponse.dto';
import { CreateAccessControlListToUserService } from '@/modules/accessControlList/services/CreateAccessControlListToUser.service';
import { User } from '@/modules/users/infra/typeorm/entities/User.entity';
import { ExceptionErrorDTO } from '@/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from '@/shared/errors/dtos/validationError.dto';
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

@ApiTags('Access Control List')
@Controller('users/:user_id/acl')
export class CreateUserAccessControlListController {
  constructor(
    private readonly createAccessControlListToUserService: CreateAccessControlListToUserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: CreateACLToUserResponseDTO,
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
    @Body() { permissions, roles }: CreateACLToUserRequestDTO,
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
