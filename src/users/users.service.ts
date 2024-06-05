import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('AuthService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Authservice connected to database')
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    const [totalUsers, users] = await Promise.all([
      this.user.count({ where: { isActive: true } }),
      this.user.findMany({
        where: { isActive: true },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    users.forEach(user => delete user.password);

    const totalPages = Math.ceil(totalUsers / limit);

    return {
      totalUsers,
      page,
      totalPages,
      next: (totalUsers - (page * limit)) > 0 ? `api/users?page=${page + 1}&limit=${limit}` : null,
      prev: (page - 1 > 0) ? `api/users?page=${page - 1}&limit=${limit}` : null,
      users
    }

  }

  async findOne(id: string) {
    const user = await this.user.findUnique({ where: { id } });
    if (!user) throw new Error('User not found');

    delete user.password;
    return { user };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    await this.findOne(id);

    const user = await this.user.update({
      where: { id },
      data: { isActive: false },
    });

    delete user.password;
    return { user };
  }
}
