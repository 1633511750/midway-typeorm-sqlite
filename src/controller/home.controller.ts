import { Controller, Get } from '@midwayjs/decorator';
// import { createConnection } from 'typeorm';
// import { UserEntity } from '../entity/user.entity';

@Controller('/')
export class HomeController {
  @Get('/')
  async home(): Promise<string> {
    // const dbConnection = await createConnection({
    //   type: 'sqlite',
    //   database: ':memory:',
    //   dropSchema: true,
    //   entities: [UserEntity],
    //   synchronize: true,
    //   logging: false,
    // });
    return 'Hello Midwayjs!';
  }
}
