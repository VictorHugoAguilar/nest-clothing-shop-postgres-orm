import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

export const handleDBExeptions = (error: any): never => {
  const logger = new Logger('handleDBExeptions');
  if (error.code === '23505') {
    throw new BadRequestException(error.detail);
  }
  logger.error(error);
  throw new InternalServerErrorException('Unexpected error, check server logs');
};
