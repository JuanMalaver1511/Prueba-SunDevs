import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 👇 IMPORTANTE
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 👇 CONFIG SWAGGER
  const config = new DocumentBuilder()
    .setTitle('API Hype Tecnológico')
    .setDescription('Documentación de endpoints')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 👉 ruta: /api

  await app.listen(3000);
}
bootstrap();
