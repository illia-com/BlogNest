import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly repo: Repository<Users>,
  ) {}

  findAll() {
    return this.repo.find({
      relations: {
        posts: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({
      where: { id },
      relations: {
        posts: true,
      },
    });
    if (!user) throw new HttpException('Not found user', HttpStatus.NOT_FOUND);

    return user;
  }
}
