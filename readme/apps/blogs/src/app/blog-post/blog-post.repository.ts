import { Injectable } from "@nestjs/common";
import { CRUDRepositoryInterface } from "@readme/core";
import { BlogPostEntity } from "./blog-post.entity";
import { PostInterface } from '@readme/shared-types'
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class BlogPostRepository implements CRUDRepositoryInterface<BlogPostEntity, number, PostInterface>{

  constructor(private readonly prisma: PrismaService){

  }

  public async find(): Promise<PostInterface[]> {
    return this.prisma.post.findMany({
      include: {
        comments: true
      }
    });
  }

  public async findById(id: number): Promise<PostInterface | null> {
    return this.prisma.post.findFirst({
      where: {
        id
      },
      include: {
        comments: true
      }
    });
  }
  public create(item: BlogPostEntity): Promise<PostInterface> {
    throw new Error("Method not implemented.");
  }
  public update(id: number, item: BlogPostEntity): Promise<PostInterface> {
    throw new Error("Method not implemented.");
  }
  public destroy(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

}
