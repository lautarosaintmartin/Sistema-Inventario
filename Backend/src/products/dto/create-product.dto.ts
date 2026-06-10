import { Type } from "class-transformer"
import { IsDecimal, IsEmpty, isInt, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsString, Length, Min } from "class-validator"


export class CreateProductDto {

    @IsString({ message: 'El nombre debe ser texto.' })
    @Length(3, 255, { message: 'El nombre debe tener al menos 3 caracteres.' })
    name!: string

    @Type(() => Number)
    @IsNumber({}, { message: 'El stock no es valido, tiene que ser numero.' })
    @Min(0, { message: 'El stock no puede ser negativo' })
    stock!: number

    @Type(() => Number)
    @IsNotEmpty({ message: 'Debe seleccionar una categoria.' })
    id_categoria!: number

    @Type(() => Number)
    @Min(1, { message: 'El precio no puede ser 0 o negativo.' })
    precioUnitario!: number
}
