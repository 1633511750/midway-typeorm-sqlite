import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Application, Framework } from '@midwayjs/koa';
import { UserController } from '../../src/controller/user'
import { LoginResultType } from '../../src/interface';

describe('test/controller/home.test.ts', () => {

  let app: Application;
  let time = Date.now()

  beforeAll(async () => {
    // 只创建一次 app，可以复用
    try {
      //     1. 首先向内存数据库插入一条测试用户数据
      await new UserController().init()
      // 由于Jest在BeforeAll阶段的error会忽略，所以需要包一层catch
      // refs: https://github.com/facebook/jest/issues/8688
      app = await createApp<Framework>();
    } catch (err) {
      console.error('test beforeAll error', err);
      throw err;
    }
  });

  it('should GET /', async () => {
    // 正确登录测试
    const successResult: LoginResultType = await createHttpRequest(app).post('/api/user/login').send({ username: 'jack', password: 'redballoon' });
    expect(successResult.code).toBe(200);
    expect(successResult.result).toBe('success');
    expect(Date.now() - time < 1000).toBe(true);

    // 错误登录测试
    const errorResult: LoginResultType = await createHttpRequest(app).post('/api/user/login').send({ username: 'test', password: 'test' })
    // use expect by jest
    expect(errorResult.code).toBe(200);
    expect(errorResult.result).toBe('success');
  });


  afterAll(async () => {
    // close app
    await close(app);
  });
});
