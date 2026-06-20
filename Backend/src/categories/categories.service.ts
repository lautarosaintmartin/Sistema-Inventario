import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../commons/pagination.dto';

const DEFAULT_LIMIT = 5
const DEFAULT_PAGE = 1

@Injectable()
export class CategoriesService {

  constructor(private prismaService: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto) {

    try{
      const existingCategory = await this.prismaService.category.findUnique({
        where:{
          name: createCategoryDto.name,
        }
      })

      if(existingCategory){
         throw new ConflictException('El nombre de categoria ya esta en uso.')
      }

       return await this.prismaService.category.create({
        data: createCategoryDto
      })

    }catch(error){
      console.log(error)
      throw error
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try{

      const count = await this.prismaService.category.count()
      const categories = await this.prismaService.category.findMany({
        orderBy: {
          name: "asc",
        },
        skip: (paginationDto.page || DEFAULT_PAGE) * (paginationDto.limit || DEFAULT_LIMIT) - (paginationDto.limit || DEFAULT_LIMIT),
        take: paginationDto.limit || DEFAULT_LIMIT,
      })

      // return await this.prismaService.category.findMany()
      return {
        data: categories,
        pagination: {
          totalItems: count,
          page: paginationDto.page || DEFAULT_PAGE,
          limit: paginationDto.limit || DEFAULT_LIMIT,
          totalPages: Math.ceil(count / (paginationDto.limit || DEFAULT_LIMIT)),
          nextPage: paginationDto.page || DEFAULT_PAGE + 1,
          previousPage: paginationDto.page || DEFAULT_PAGE - 1,
        }
      }
    }catch(error){
      console.log(error)
      throw error
    }
  }

  async findOne(id: number) {
    try{
      return await this.prismaService.category.findUnique(
        {
          where:{
            id: id
          }
        }
      )
    }catch(error){
      console.log(error)
      throw error
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id)

    try{

      if (!category) {
        throw new NotFoundException('Category not found')
      }

      const existingCategory = await this.prismaService.category.findUnique(
        {where:{
          name: updateCategoryDto.name,
        }
      })

       if(existingCategory && existingCategory.id !== id){
        throw new ConflictException('Ya hay una categoria con este nombre')
      }

      return await this.prismaService.category.update({
        where: {
          id,
        },
        data: updateCategoryDto
      }
      )

    }catch(error){
      console.log(error)
      throw error
    }
  }

  async remove(id: number) {
    try{
    return await this.prismaService.category.delete({
      where: {
        id,
      }
    })
    } catch(error) {
      console.log(error)
      throw error
    }
  }
}
