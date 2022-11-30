import { CRUDRepositoryInterface } from '@readme/core';
import { UserInterface } from '@readme/shared-types';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class BlogUserMemoryRepository implements CRUDRepositoryInterface<BlogUserEntity, string, UserInterface> {

  private repository: {[key: string]: UserInterface} = {};

  async findById(id: string): Promise<UserInterface | null> {
    if(this.repository[id]){
      return {...this.repository[id]};
    }

    return null;
  }

  async findByEmail(email: string): Promise<UserInterface | null> {
    const user = Object.values(this.repository).find((user) => user.email === email)

    if(!user){
      return null;
    }

    return {...user};
  }


  async create(item: BlogUserEntity): Promise<UserInterface> {
    const entry = {...item.toObject(), _id: randomUUID()};
    this.repository[entry._id] = entry;

    return {...entry};
  }

  update(id: string, item: BlogUserEntity): Promise<UserInterface> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }

  async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }
}
