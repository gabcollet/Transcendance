import {
  IsString,
  IsAlphanumeric,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class ChatDto {
  @IsString()
  @IsAlphanumeric()
  @MinLength(4)
  @MaxLength(10)
  public name: string;

  @IsOptional()
  @IsString()
  @IsAlphanumeric()
  @MinLength(4)
  @MaxLength(10)
  public password: string;

  @IsBoolean()
  public checked: boolean;

  @IsBoolean()
  public protected: boolean;
}

export class PasswordDto {
  @IsString()
  @IsAlphanumeric()
  @MinLength(4)
  @MaxLength(10)
  public password: string;
}
