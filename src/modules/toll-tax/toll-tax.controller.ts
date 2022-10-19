import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoggerMessages } from 'src/exceptions';
import { LoggerService } from 'src/logger/logger.service';
import { Vehicle } from './toll-tax.dto';
import {TollTaxService} from './toll-tax.service';
@Controller('toll-tax')
export class TollTaxController {
    constructor(
        private tollTaxService: TollTaxService,
        private readonly loggerService: LoggerService,
      ) {
        this.loggerService.setContext('Toll Tax controller');
      }

      @Post("/register")
      @HttpCode(HttpStatus.CREATED)
      async create(@Body() body: Vehicle) {
        this.loggerService.log(`Post vehicle registration ${LoggerMessages.API_CALLED}`);
        return this.tollTaxService.registerVehicle(body);
      }

      
      @Post("/exit")
      @HttpCode(HttpStatus.CREATED)
      async exitPoint(@Body() body: Vehicle) {
        this.loggerService.log(`Post vehicle exit point ${LoggerMessages.API_CALLED}`);
        return this.tollTaxService.exitPoint(body);
      }
}
