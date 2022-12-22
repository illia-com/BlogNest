import { Categories } from 'src/category/categories.entity';
import { Tag } from 'src/tags/entities/tag.entity';

import { Users } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Status } from './status.enum';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.New,
  })
  status: Status;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => Users, (author) => author.posts)
  author: any;

  @ManyToOne(() => Categories, (category) => category.posts)
  category: Categories | string;

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'posts_tags',
    joinColumn: {
      name: 'postsId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tagsId',
      referencedColumnName: 'id',
    },
  })
  tags: Tag[];
}
