import { Controller, Get } from '@nestjs/common';
import os from 'node:os';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      service: 'nest-configured',
      host: os.hostname(),
      uptimeSeconds: Math.round(process.uptime()),
    };
  }
}