import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { IUserOptions } from '../interface';

@Provide()
export class UserService {
  @InjectEntityModel(UserEntity)
  userModel: Repository<UserEntity>;

  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }

  async findUsers() {
    const allUsers = await this.userModel.find({});
    return allUsers;
  }

  async addUser(username, password): Promise<UserEntity> {
    const user = new UserEntity();
    user.username = username;
    user.password = password;

    await this.userModel.save(user);
    return user;
  }
}
