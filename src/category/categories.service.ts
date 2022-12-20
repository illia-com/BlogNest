import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from './categories.entity';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { UpdateCategoriesDto } from './dto/update-categories.dto';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Categories) private readonly repo: Repository<Categories>,
  ) {}

  create(createCategoriesDto: CreateCategoriesDto) {
    const category = this.repo.create(createCategoriesDto);
    const { title, ...data } = category;
    const slug = slugify(title, {
      replacement: '_',
      lower: true,
    });
    const categoryRes = {
      title: slug,
      ...data,
    };
    return this.repo.save(categoryRes);
  }

  findAll() {
    return this.repo.find({
      relations: {
        posts: true,
      },
    });
  }

  async findOne(id: number) {
    const category = await this.repo.findOne({
      where: { id },
      relations: {
        posts: true,
      },
    });
    if (!category) return { message: `Not found tag id ${id}` };
    return category;
  }

  async update(id: number, updateCategoriesDto: UpdateCategoriesDto) {
    await this.repo.update(id, updateCategoriesDto);
    const category = await this.repo.findOne({ where: { id } });
    if (!category) return { message: `Not found tag id ${id}` };
    return category;
  }

  async remove(id: number) {
    const category = await this.repo.findOne({ where: { id } });
    if (!category) return { message: `Not found tag id ${id}` };
    return await this.repo.delete(id);
  }
}
