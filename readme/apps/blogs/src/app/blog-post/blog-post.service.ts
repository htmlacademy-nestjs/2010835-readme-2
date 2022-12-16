import { Injectable } from "@nestjs/common";
import { PostInterface } from "@readme/shared-types";
import { BlogPostRepository } from "./blog-post.repository";

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
  ) {}

  async getPosts(): Promise<PostInterface[]> {
    return this.blogPostRepository.find();
  }

  async getPost(id: number): Promise<PostInterface> {
    return this.blogPostRepository.findById(id);
  }
}
