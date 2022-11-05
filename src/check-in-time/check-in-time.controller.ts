import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { ValidateMongoIdPipe } from './../common/pipes/validate-mongo-id.pipe';
import { CheckInTimeService } from './check-in-time.service';
import { UpdateCheckInTimeDto } from './dto/update-check-in-time.dto';

@Controller('check-in-time')
export class CheckInTimeController {
  constructor(private readonly checkInTimeService: CheckInTimeService) {}

  @Get()
  findAll() {
    return this.checkInTimeService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id', ValidateMongoIdPipe) id: string,
    @Body() updateCheckInTimeDto: UpdateCheckInTimeDto,
  ) {
    return this.checkInTimeService.update(id, updateCheckInTimeDto);
  }
}
