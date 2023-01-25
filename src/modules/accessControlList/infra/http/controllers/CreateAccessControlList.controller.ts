import { ACCESS_CONTROL_LIST } from '@/config/constants/resourceTags.constants';
import {
  BAD_REQUEST_RESPONSE,
  CREATED_RESPONSE,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_RESPONSE,
} from '@/config/constants/responses.constant';
import { CreateACLToUserDTO } from '@/modules/accessControlList/dtos/http/requests/CreateAccessControlListToUser.dto';
import { CreatedACLToUserDTO } from '@/modules/accessControlList/dtos/http/responses/CreatedAccessControlListToUser.dto';
import { RolesEnum } from '@/modules/accessControlList/dtos/roles.enum';
import { CreateAccessControlListToUserService } from '@/modules/accessControlList/services/CreateAccessControlListToUser.service';
import { User } from '@/modules/users/infra/typeorm/entities/User.entity';
import { HasRoles } from '@/shared/decorators/roles.decorator';
import { ExceptionErrorDTO } from '@/shared/errors/dtos/exceptionError.dto';
import { ValidationErrorDTO } from '@/shared/errors/dtos/validationError.dto';
import { RolesGuard } from '@/shared/guards/Roles.guard';
import { JwtAuthGuard } from '@/shared/infra/http/guards/jwtAuth.guard';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

@ApiTags(ACCESS_CONTROL_LIST)
@Controller('users/:id/acl')
export class CreateUserAccessControlListController {
  constructor(
    private readonly createAccessControlListToUserService: CreateAccessControlListToUserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: CreatedACLToUserDTO,
    description: CREATED_RESPONSE,
  })
  @ApiBadRequestResponse({
    type: ValidationErrorDTO,
    description: BAD_REQUEST_RESPONSE,
  })
  @ApiNotFoundResponse({
    type: ExceptionErrorDTO,
    description: NOT_FOUND_RESPONSE,
  })
  @ApiInternalServerErrorResponse({
    type: ExceptionErrorDTO,
    description: INTERNAL_SERVER_ERROR,
  })
  @HasRoles(RolesEnum.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async handle(
    @Param('id') userId: string,
    @Body() { permissions, roles }: CreateACLToUserDTO,
  ): Promise<User> {
    const createACLToUsers =
      await this.createAccessControlListToUserService.execute({
        userId,
        permissions,
        roles,
      });

    return plainToClass(User, createACLToUsers);
  }
}
