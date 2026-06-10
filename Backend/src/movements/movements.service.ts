import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { PrismaService } from '../prisma/prisma.service';
import { MovementType } from '@generated';

@Injectable()
export class MovementsService {
  constructor(private prismaService: PrismaService) { }

  async create(createMovementDto: CreateMovementDto) {

    try {

      let product = await this.prismaService.products.findUnique({
        where: {
          id: createMovementDto.productId
        }
      })

      if(!product){
        throw new NotFoundException('Producto no encontrado')
      }

      if(product.stock < createMovementDto.amount && createMovementDto.type === MovementType.OUT){
        throw new BadRequestException('No hay stock suficiente')
      }

      const transaction = await this.prismaService.$transaction(async (tx) => {

        const newMovement = await tx.movement.create({
          data: {
            ...createMovementDto,
            date: new Date(createMovementDto.date)
          }
        })

        let newStock = createMovementDto.type === MovementType.IN ? product!.stock + createMovementDto.amount : product!.stock - createMovementDto.amount

       await tx.products.update({
          where: {
            id: createMovementDto.productId,
          },
          data: {
            stock: newStock,
          }
        })

        return newMovement;

      })

      return transaction
    
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async findAll() {
    try {
      return await this.prismaService.movement.findMany({
        include: {
          user: true,
          product: true,
        }
      }
      );

    } catch (error) {
      console.log(error)
      throw error
    }
  }


  async findOne(id: number) {
    try {
      return await this.prismaService.movement.findUnique(
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

  async update(id: number, updateMovementDto: UpdateMovementDto) {
    const movement = await this.findOne(id)

    try {

      return await this.prismaService.movement.update({
        where: {
          id,
        },
        data: updateMovementDto

      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.movement.delete({
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