import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from 'src/models/category.dto';

@Controller('category')
export class CategoryController {
    constructor(
        private categoryService: CategoryService
    ) { }
    @Post("/create")
    create(@Body() dataCategory: CategoryDTO) {
        return this.categoryService.createCategory(dataCategory);
    }
    @Get("/all")
    findAll() {
        return this.categoryService.findAll();
    }
    @Put("/update/:id")
    update(@Param("id") id: number, @Body() dataCategory: CategoryDTO) {
        return this.categoryService.updateCategory(id, dataCategory);
    }
    @Delete("/delete/:id")
    delete(@Param("id") id: number) {
        return this.categoryService.deleteCategory(id);
    }
    @Get("/findParentAndSubCategory")
    findParentAndSub() {
        return this.categoryService.findParentAndSubCategory();
    }
    @Get("/findPost")
    findPost() {
        return this.categoryService.findPostByCategory();
    }
}
