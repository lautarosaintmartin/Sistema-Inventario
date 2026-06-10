import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) { }

  async create(createProductDto: CreateProductDto) {

    const { id_categoria, ...rest } = createProductDto
    try {
      return await this.prismaService.products.create({
        data:{
          name: rest.name,
          stock: rest.stock,
          precioUnitario: rest.precioUnitario,
          categoria: {
          connect: { id: Number(id_categoria) }
        }
      }
      })

    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async findAll() {
    try {
      const products = await this.prismaService.products.findMany({
        orderBy: {
          name: "asc",
        },
        select: {
          categoria: {
            select: {
              id: true,
              name: true
            }
          },
          id: true,
          name: true,
          stock: true,
          precioUnitario: true,
        },
      })

      return products
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.products.findUnique(
        {
          where: {
            id: id
          }
        }
      )
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id)

    Logger.debug(updateProductDto)

    try {

      if (!product) {
        throw new NotFoundException('Product not found')
      }

      const existingProduct = await this.prismaService.products.findFirst(
        {
          where: {
            name: updateProductDto.name,
          }
        })

      if (existingProduct && existingProduct.id !== id) {
        throw new ConflictException('Ya hay un producto con este nombre')
      }

      return await this.prismaService.products.update({
        where: {
          id,
        },
        data: updateProductDto,
      }
      )

    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.products.delete({
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