import { Type } from "class-transformer";
import { IsDate, IsEmail, IsOptional, IsString, IsUUID, Matches, MaxLength, MinLength, Validate } from "class-validator";

export class CreateUserDto {

  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  last_name: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsDate()
  @Type(() => Date) // This will transform the incoming value to a Date object
  @IsOptional()
  birthdate?: Date;

  @IsString()
  @MinLength(8)
  dni: string;

  @IsUUID()
  @IsOptional()
  id_grade?: string;
}
