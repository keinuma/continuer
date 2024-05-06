import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    const users = await this.appService.findAll();
    if (users.length === 0) {
      return 'No users found';
    }

    const firstUser = users[0];
    return `${firstUser.name}を発見！！！`;
  }
}
