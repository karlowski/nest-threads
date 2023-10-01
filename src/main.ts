import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserExistenceInterceptor } from './interceptors/user-existence.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalInterceptors(new UserExistenceInterceptor())
  await app.listen(3000);
}
bootstrap();
