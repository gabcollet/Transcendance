import {
  IsString,
  IsAlphanumeric,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class ChatDto {
  @IsString()
  @IsAlphanumeric()
  @MinLength(4)
  @MaxLength(20)
  public name: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  public password?: string;
}
