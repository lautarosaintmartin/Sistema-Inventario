import { MovementType } from "@generated";
import { Type } from "class-transformer";
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateMovementDto {

    @IsEnum(MovementType, {message: 'El tipo de movimiento no es válido'})
    type!: MovementType

    @IsDateString({strict: true}, {message: 'La fecha no es válida'})
    date!: string

    @IsInt({message: 'La cantidad no es válida'})
    @Type(() => Number)
    @Min(1, {message: 'La cantidad no puede ser 0'})
    amount!: number

    @IsNotEmpty({message: 'El precio unitario es obligatorio'})
    @Type(() => Number)
    @IsNumber()
    priceUnit!: number

    @IsNotEmpty({message: 'El precio unitario es obligatorio'})
    @Type(() => Number)
    @IsNumber()
    productId!: number

    @IsNotEmpty({message: 'El precio unitario es obligatorio'})
    @Type(() => Number)
    @IsNumber()
    userId!: number
}
