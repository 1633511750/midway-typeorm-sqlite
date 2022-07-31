import { MidwayConfig } from '@midwayjs/core';
import { UserEntity } from '../entity/user.entity';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1659191918800_2485',
  koa: {
    port: 7001,
  },
  orm: {
    type: 'sqlite',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '',
    database: ':memory:',
    synchronize: true,
    logging: false,

    entities: [UserEntity],
  },
  jwt: {
    secret: 'coldiceth123',
    expiresIn: '2d',
  },
} as MidwayConfig;
