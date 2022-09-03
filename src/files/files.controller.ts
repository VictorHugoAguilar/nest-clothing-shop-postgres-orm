import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { fileFilter } from './helpers';
import { diskStorage } from 'multer';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      // limits: { fileSize: 1000 },
      storage: diskStorage({
        destination: './static/uploads',
      })
    }),
  )
  uploadProductImage(@UploadedFile() file: Express.Multer.File) {
    console.info('uploadProductImage', file);

    if (!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }

    return { filenamed: file.originalname };
  }
}
