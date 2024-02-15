import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO, CategorySearchDTO } from 'src/models/category.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('category')
@ApiTags("category")
export class CategoryController {
    constructor(
        private categoryService: CategoryService
    ) { }
    @Post("/create")
    create(@Body(ValidationPipe) dataCategory: CategoryDTO) {
        return this.categoryService.createCategory(dataCategory);
    }
    @Get("/all")
    findAll() {
        return this.categoryService.findAll();
    }
    @Put("/update")
    update(
        @Query('id', new ParseIntPipe()) id: number,
        @Body(ValidationPipe) dataCategory: CategoryDTO
    ) {
        return this.categoryService.updateCategory(id, dataCategory);
    }
    @Delete("/delete")
    delete(
        @Query('id', new ParseIntPipe()) id: number
    ) {
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
    @Post("/search")
    findByName(@Body() categoryName: CategorySearchDTO) {
        return this.categoryService.findByName(categoryName);
    }
}
