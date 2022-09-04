import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-userdto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
