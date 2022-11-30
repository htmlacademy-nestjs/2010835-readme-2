import { Expose } from "class-transformer";

export class LoginUserRdo{
  @Expose({name: '_id'})
  public id;

  @Expose()
  public email;

  @Expose()
  public accessToken: string;
}
