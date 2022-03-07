import { IUser, User, UserDoc } from '../../models/user';

export class UserRepository {
  public async findAllUsers(): Promise<UserDoc[]> {
    const users = await User.find({});
    return users;
  }

  public async create(newUser: IUser): Promise<UserDoc> {
    const user = User.build(newUser);
    await user.save();
    return user;
  }
}
