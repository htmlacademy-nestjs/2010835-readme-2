import {UserInterface} from '@readme/shared-types';
import {genSalt, hash, compare} from 'bcrypt';

const SALT_ROUNDS = 10;

export class BlogUserEntity implements UserInterface{
  public _id: string;
  public email: string;
  public name: string;
  public surname: string;
  public passwordHash: string;
  public avatar: string;
  public registerDate: Date;
  public postQuantity: number;
  public subscribers: string[];
  public subscribersQuantity: number;


  constructor(user: UserInterface){
    this.fillEntity(user);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(user: UserInterface){
    this._id = user._id;
    this.email = user.email;
    this.name = user.name;
    this.surname = user.surname;
    this.passwordHash = user.passwordHash;
    this.avatar = user.avatar;
    this.registerDate = user.registerDate;
    this.postQuantity = user.postQuantity;
    this.subscribers = [...user.subscribers];
    this.subscribersQuantity = user.subscribersQuantity;
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
