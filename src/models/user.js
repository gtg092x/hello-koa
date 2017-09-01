import { Model } from 'objection';
import { isString } from 'lodash';

export default class User extends Model {
  static get tableName() {
    return 'user';
  }
  static async fetchUser(arg) {
    const params = isString(arg)
      ? { id: arg} :
      arg;
    return User.query().where(params).first();
  }
}

export const fetchUser = arg => User.fetchUser(arg);
