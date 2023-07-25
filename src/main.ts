import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 데코레이터 없으면 삭제
    forbidNonWhitelisted: true, // 화이트리스트에 없는 속성 -> 에러
    transform: true, // 명시된 타입으로 변환
  }));
  await app.listen(3000);
}
bootstrap();
