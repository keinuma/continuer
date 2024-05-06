import { Injectable } from '@nestjs/common';
import { users } from '@prisma/client';

import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!!!';
  }
  findAll(): Promise<users[]> {
    return this.prisma.users.findMany();
  }
}
