import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SeedModule } from './seed/seed.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';


@Module({
  imports: [AuthModule, UsersModule,SeedModule, StudentsModule, TeachersModule],

})
export class AppModule {}
