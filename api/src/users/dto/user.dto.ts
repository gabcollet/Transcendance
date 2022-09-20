import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UserDto {

  @IsOptional()
  @IsNumber()
  id: number;
  
  @IsNumber()
  intraId: number;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  displayname: string;

  @IsString()
  @IsOptional()
  picture: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsNumber()
  wins: number;

  @IsNumber()
  losses: number;
}
