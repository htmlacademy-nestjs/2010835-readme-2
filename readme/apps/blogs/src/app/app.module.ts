import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { BlogPostModule } from './blog-post/blog-post.module';
import { ENV_FILE_PATH } from './app.constants';
import { jwtConfig } from '../config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [jwtConfig],
    }),
    BlogPostModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
