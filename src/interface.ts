/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

export type LoginResultType = {
  code: number;
  result: 'success' | 'error';
  message: string;
  data: {
    token: string;
  };
};
