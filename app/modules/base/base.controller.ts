import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { BaseService } from './base.service';

@ApiTags('Base')
@Controller()
export class BaseController {
  constructor(@Inject(BaseService) private readonly baseService: BaseService) {}

  @Get()
  @ApiOperation({ summary: 'Root endpoint' })
  getHello(): string {
    return this.baseService.getHello();
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  @HttpCode(HttpStatus.OK)
  checkHealth(): { status: string } {
    return this.baseService.getHealth();
  }
}
