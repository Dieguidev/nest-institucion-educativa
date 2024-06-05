import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SeedModule } from './seed/seed.module';


@Module({
  imports: [AuthModule, UsersModule,SeedModule],

})
export class AppModule {}
