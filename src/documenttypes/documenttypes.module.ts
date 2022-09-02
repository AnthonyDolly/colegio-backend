import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { DocumenttypesService } from './documenttypes.service';
import { DocumenttypesController } from './documenttypes.controller';
import {
  Documenttype,
  DocumenttypeSchema,
} from './entities/documenttype.entity';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Documenttype.name,
        schema: DocumenttypeSchema,
      },
    ]),
  ],

  controllers: [DocumenttypesController],
  providers: [DocumenttypesService],
  exports: [MongooseModule],
})
export class DocumenttypesModule {}
