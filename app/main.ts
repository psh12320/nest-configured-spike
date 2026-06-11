import 'reflect-metadata';
import { config } from 'dotenv';

config();

import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { appConfig, setupCors, setupSecurity, setupSwagger } from './config';

async function bootstrap(): Promise<void> {
  const trustProxyEnv = process.env.TRUST_PROXY;
  const trustProxy: boolean | number | string | undefined =
    trustProxyEnv === '*'
      ? true
      : trustProxyEnv && /^\d+$/.test(trustProxyEnv)
        ? parseInt(trustProxyEnv, 10)
        : trustProxyEnv;

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(trustProxy ? { trustProxy } : {}),
    { bufferLogs: true },
  );
  const logger = app.get(Logger);
  app.useLogger(logger);

  await setupSecurity(app);
  logger.log('Security middleware configured');

  setupCors(app);
  logger.log('CORS configured');

  setupSwagger(app);
  logger.log('Swagger documentation configured');

  await app.init();
  logger.log('Application initialized');

  const port = appConfig.PORT;
  await app.listen(port, '0.0.0.0');

  logger.log(`${appConfig.PROJECT_NAME} running on: http://localhost:${port}`);
  logger.log(`Swagger docs available at: http://localhost:${port}/docs`);
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
