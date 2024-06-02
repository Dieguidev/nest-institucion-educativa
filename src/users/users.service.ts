import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('AuthService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Authservice connected to database')
  }

  async findAll() {
    return await this.user.findMany({ where: { isActive: true } });
  }

  async findOne(id: string) {
    const user = await this.user.findUnique({ where: { id } });
    if (!user) throw new Error('User not found');
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
