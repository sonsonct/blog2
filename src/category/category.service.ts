import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entitys/Category.entity';
import { CategoryDTO } from 'src/models/category.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) { }
    async findAll() {
        try {
            return await this.categoryRepository.find();
        } catch (error) {
            console.log(error);
        }
    }
    async createCategory(dataCategory: CategoryDTO) {
        try {
            return await this.categoryRepository.save(dataCategory);
        } catch (error) {
            console.log(error);
        }
    }
    async updateCategory(id: number, dataCategory: CategoryDTO) {
        try {
            const category = await this.categoryRepository.findOneBy({ id });

            if (category == null) {
                return {
                    "error": "category not found"
                }
            }

            category.categoryName = dataCategory.categoryName;

            return await this.categoryRepository.save(category);
        } catch (error) {
            console.log(error);
        }
    }
    async deleteCategory(id: number) {
        try {
            const category = await this.categoryRepository.findOneBy({ id });

            if (category == null) {
                return {
                    "error": "category not found"
                }
            }

            return await this.categoryRepository.remove(category);
        } catch (error) {
            console.log(error);
        }
    }
    async findParentAndSubCategory() {
        try {
            return await this.categoryRepository.createQueryBuilder('category')
                .leftJoinAndSelect('category.subCategories', 'subCategories')
                .where('subCategories.parentId = category.id OR category.parentId IS NULL')
                .getMany();
        } catch (error) {
            console.log(error);
        }
    }

    async findPostByCategory() {
        try {
            return await this.categoryRepository.createQueryBuilder('category')
                .leftJoinAndSelect('category.post', 'post')
                .where('post.categoryId = category.id')
                .getMany();
        } catch (error) {
            console.log(error);
        }
    }
}
