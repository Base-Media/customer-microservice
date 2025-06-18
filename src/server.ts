import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  // CORS configuration
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://main.d39s06ite0zb3q.amplifyapp.com',
      'https://main.d1xyxumoctgjix.amplifyapp.com',
      'https://siadash.com'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  const port = process.env.PORT || 4004;
  await app.listen(port);
  
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
}

bootstrap();