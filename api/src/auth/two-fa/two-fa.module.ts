import { HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TwoFaController } from './two-fa.controller';
import { TwoFaService } from './two-fa.service';

@Module({
  controllers: [TwoFaController],
  providers: [TwoFaService, HttpService],
})
export class TwoFaModule {}
