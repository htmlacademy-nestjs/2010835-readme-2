import { Expose } from "class-transformer";

export class CreateUserRdo{
  @Expose({name: '_id'})
  public id;

  @Expose()
  public email;

  @Expose()
  public name;

  @Expose()
  public surname;

  @Expose()
  public avatar;

  @Expose()
  public registerDate;
}
