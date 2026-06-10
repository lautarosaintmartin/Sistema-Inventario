import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProviderService {
  constructor(private prismaService: PrismaService) { }


  async create(createProviderDto: CreateProviderDto) {
    try {
      const existingProvider = await this.prismaService.providers.findUnique({
        where:
        {
          email: createProviderDto.email,
        }
      })

      if (existingProvider) {
        throw new ConflictException('El proveedor ya existe.')
      }

      return await this.prismaService.providers.create({
        data: createProviderDto
      })

    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async findAll() {
    try {
      const providers = await this.prismaService.providers.findMany({
        orderBy: {
          name: "asc",
        }
      }
      )

      return providers

    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.providers.findUnique({
        where: {
          id: id
        }
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async update(id: number, updateProviderDto: UpdateProviderDto) {
    try {
      const provider = await this.findOne(id)

      if (!provider) {
        throw new NotFoundException('Provider not found')
      }

      const existingProvider = await this.prismaService.providers.findUnique({
        where: {
          email: updateProviderDto.email,
        }
      })

      if (existingProvider && existingProvider.id !== id) {
        throw new ConflictException('El correo electrónico ya está en uso.')
      }


      return await this.prismaService.providers.update({
        where: {
          id: id,
        },
        data: updateProviderDto
      });
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.providers.delete({
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
