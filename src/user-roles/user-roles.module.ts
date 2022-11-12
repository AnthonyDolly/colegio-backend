import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserRolesService } from './user-roles.service';
import { UserRolesController } from './user-roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './../users/entities/user.entity';
import { AuthModule } from './../auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [UserRolesController],
  providers: [UserRolesService],
  exports: [MongooseModule, UserRolesService],
})
export class UserRolesModule {}
