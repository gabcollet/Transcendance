import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  intraId: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  displayname: string;

  @IsOptional()
  @IsString()
  picture: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsNumber()
  wins: number;

  @IsNumber()
  losses: number;
}
