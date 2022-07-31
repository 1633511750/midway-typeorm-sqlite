import { Rule, RuleType } from '@midwayjs/validate';

export class UserLoginDTO {
  @Rule(RuleType.string().required().min(1))
  username: string;

  @Rule(RuleType.string().required().min(1))
  password: string;
}
