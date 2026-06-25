import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hashSync } from 'bcrypt'
import { PaginationDto } from '../commons/pagination.dto';

const DEFAULT_LIMIT = 5
const DEFAULT_PAGE = 1

@Injectable()
export class UsersService {

  constructor(private prismaService: PrismaService) { }

  async create(createUserDto: CreateUserDto) {

    try {

      //Validar que el correo exista

      const existingUser = await this.prismaService.user.findUnique(
        {
          where: {
            email: createUserDto.email,
          }
        })

      if (existingUser) {
        throw new ConflictException('El correo electrónico ya está en uso.')
      }

      return await this.prismaService.user.create({
        data: {
          ...createUserDto,
          password: hashSync(createUserDto.password, 10)
        }
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {

      const count = await this.prismaService.user.count()
      const users = await this.prismaService.user.findMany({
        orderBy: {
          fullname: "asc",
        },
        skip: (paginationDto.page || DEFAULT_PAGE) * (paginationDto.limit || DEFAULT_LIMIT) - (paginationDto.limit || DEFAULT_LIMIT),
        take: paginationDto.limit || DEFAULT_LIMIT,
      });
     
      return{
        data: users,
        pagination: {
          totalItems: count,
          page: paginationDto.page || DEFAULT_PAGE,
          limit: paginationDto.limit || DEFAULT_LIMIT,
          totalPages: Math.ceil(count / (paginationDto.limit || DEFAULT_LIMIT)),
          nextPage: paginationDto.page || DEFAULT_PAGE + 1,
          previousPage: paginationDto.page || DEFAULT_PAGE - 1
        }
      }
    
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.user.findUnique(
        {
          where: {
            id: id
          }
        }
      );
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id)

    try {

      if (!user) {
        throw new NotFoundException('User not found')
      }

      //Validar que el correo exista

      const existingUser = await this.prismaService.user.findUnique(
        {
          where: {
            email: updateUserDto.email,
          }
        })

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('El correo electrónico ya está en uso.')
      }

      return await this.prismaService.user.update({
        where: {
          id,
        },
        data: updateUserDto

      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.user.delete({
        where: {
          id,
        }
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}