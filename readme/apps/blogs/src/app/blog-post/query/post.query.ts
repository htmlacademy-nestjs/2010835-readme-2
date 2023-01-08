import { Transform } from "class-transformer";

const DEFAULT_SORT_DIRECTION = 'desc';
const DEFAULT_SORT_BY_PARAM = 'creationDate';
const DEFAULT_POST_COUNT_LIMIT = 25;

export class PostQuery {
  @Transform(value => Number(value) || DEFAULT_POST_COUNT_LIMIT)
  public limit;

  public userId: string;

  public postType?: string;

  public postTag?: string;

  public sortBy: 'creationDate' | 'likeCount' | 'commentCount' = DEFAULT_SORT_BY_PARAM;

  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  public page: number;
}
