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
  @MaxLength(20)
  public name: string;

  @IsOptional()
  @IsString()
  @IsAlphanumeric()
  @MinLength(4)
  @MaxLength(20)
  public password: string;

  @IsBoolean()
  public checked: boolean;

  @IsBoolean()
  public protected: boolean;
}
