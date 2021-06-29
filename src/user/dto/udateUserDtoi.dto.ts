import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {
  
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)  
    readonly username: string;

    @IsEmail()
    readonly email: string;
  
    readonly bio: string;
  
    readonly image: string;
}