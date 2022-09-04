import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

export const handleDBExeptions = (error: any): never => {
  const logger = new Logger('handleDBExeptions');

  if (error.code === '23505') {
    throw new BadRequestException(error.detail);
  }

  if (error.status === 401) {
    throw new UnauthorizedException(error.response);
  }

  logger.error(error);
  throw new InternalServerErrorException('Unexpected error, check server logs');
};
