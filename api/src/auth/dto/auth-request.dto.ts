import { IsString } from 'class-validator';

export class AuthRequestDto {
  @IsString()
  readonly authorization_code: string;

  @IsString()
  readonly origin: string;
}
