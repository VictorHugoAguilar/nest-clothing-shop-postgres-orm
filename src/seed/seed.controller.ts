import { Controller, Get } from '@nestjs/common';
import { Auth, GetUser } from 'src/auth/decorators';
import { SeedService } from './seed.service';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { User } from '../auth/entities/user.entity';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @Auth(ValidRoles.admin)
  executeSeed(@GetUser() user: User) {
    return this.seedService.runSeed(user);
  }
}
