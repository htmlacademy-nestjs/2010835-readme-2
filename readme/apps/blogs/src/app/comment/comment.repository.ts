import { Injectable } from "@nestjs/common";
import { CRUDRepositoryInterface } from "@readme/core";
import { PostInterface } from '@readme/shared-types'
import { PrismaService } from "../../prisma/prisma.service";
import { CommentEntity } from "./comment.entity";

@Injectable()
export class CommentRepository implements CRUDRepositoryInterface<CommentEntity, number, PostInterface>{

  constructor(private readonly prisma: PrismaService){

  }
  findById(id: number): Promise<PostInterface> {
    throw new Error("Method not implemented.");
  }
  create(item: CommentEntity): Promise<PostInterface> {
    throw new Error("Method not implemented.");
  }
  update(id: number, item: CommentEntity): Promise<PostInterface> {
    throw new Error("Method not implemented.");
  }
  destroy(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
