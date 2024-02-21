import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { CreateCategoryDTO } from './dto/request/create-category.dto';
import { SearchCategoryDTO } from './dto/request/search-category.dto';
import { Like, Repository } from 'typeorm';

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
    async createCategory(dataCategory: CreateCategoryDTO) {
        try {
            const category = await this.categoryRepository.findOneBy({ categoryName: dataCategory.categoryName });

            if (category != null) {
                return {
                    "message": "Category name exist"
                }
            }

            return await this.categoryRepository.save(dataCategory);
        } catch (error) {
            console.log(error);
        }
    }
    async updateCategory(id: number, dataCategory: CreateCategoryDTO) {
        try {
            const category = await this.categoryRepository.findOneBy({ id });

            if (category == null) {
                return {
                    "error": "category not found"
                }
            }

            const checkName = await this.categoryRepository.findOneBy({ categoryName: dataCategory.categoryName });

            if (checkName != null) {
                return {
                    "message": "Category name exist"
                }
            }

            category.parentId = dataCategory.parentId;
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

    async findByName(categoryName: SearchCategoryDTO) {
        try {
            return await this.categoryRepository.find({
                where: {
                    categoryName: Like(`%${categoryName["categoryName"]}%`),
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}
