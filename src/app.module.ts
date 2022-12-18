import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CategoryModule } from './category/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { Users } from './users/users.entity';
import { TagsModule } from './tags/tags.module';
import { Tag } from './tags/entities/tag.entity';
import { Categories } from './category/categories.entity';
import { Posts } from './posts/posts.entity';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Users, Tag, Categories, Posts],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    PostsModule,
    CategoryModule,
    TagsModule,
    AuthModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
