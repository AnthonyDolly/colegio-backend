import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { RolesModule } from './roles/roles.module';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';
import { CommonModule } from './common/common.module';
import { DocumenttypesModule } from './documenttypes/documenttypes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    RolesModule,
    MongooseModule.forRoot(process.env.MONGODB),
    CommonModule,
    DocumenttypesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
