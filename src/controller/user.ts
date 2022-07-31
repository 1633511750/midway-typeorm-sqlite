import { UserModel } from '../model/user.model';
// import { UserLoginDTO } from '../dto/user.dto';
import { JwtService } from '@midwayjs/jwt';
import { Inject, Controller, Post } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { LoginResultType } from '../interface';

@Controller('/api')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  userModel: UserModel;

  @Inject()
  jwtService: JwtService;

  async init() {
    await this.userService.addUser('jack', 'redballoon');
  }

  @Post('/user/login')
  async login(): Promise<LoginResultType> {
    const { username, password } = this.ctx.request.query;
    const user = await this.userModel.getUserByUsernameAndPassword(
      username,
      password
    );

    if (user) {
      const token = this.jwtService.signSync({ username, password });
      return {
        code: 200,
        result: 'success',
        message: '登录成功',
        data: {
          token,
        },
      };
    }
    return {
      code: 400,
      result: 'error',
      message: '账号或密码不正确',
      data: null,
    };
  }
}
