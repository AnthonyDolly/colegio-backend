import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CommonModule } from './../common/common.module';
import { RolesModule } from './../roles/roles.module';
import { DocumenttypesModule } from './../documenttypes/documenttypes.module';
import { StatusesModule } from './../statuses/statuses.module';

@Module({
  imports: [RolesModule, DocumenttypesModule, StatusesModule, CommonModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
