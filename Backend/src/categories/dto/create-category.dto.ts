import { Type } from "class-transformer"
import { IsString, Length, MinLength } from "class-validator"
import { IsEmail, IsNumber} from "class-validator"


export class CreateCategoryDto {
    
    @IsString({message: 'El nombre debe ser texto.'})
    @Length(3, 255, { message: 'El nombre debe tener al menos 3 caracteres.' })
    name!: string

}