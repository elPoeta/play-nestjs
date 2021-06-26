import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class UserDto {

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)  
  readonly username: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;
}