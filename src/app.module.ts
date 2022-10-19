/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigrationModule } from './configration/configration.module';
import { LoggerModule } from './logger/logger.module';
import { TollTaxModule } from './modules/toll-tax/toll-tax.module';

@Module({
  imports: [
    ConfigrationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    LoggerModule,
    TollTaxModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppModule],
})
export class AppModule {}
