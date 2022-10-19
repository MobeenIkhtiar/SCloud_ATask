import { Module } from '@nestjs/common';
import { TollTaxController } from './toll-tax.controller';
import { TollTaxService } from './toll-tax.service';

@Module({
  controllers: [TollTaxController],
  providers: [TollTaxService]
})
export class TollTaxModule {}
