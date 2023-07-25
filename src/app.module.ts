import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { App } from './app/app';
import { AppController } from './app.controller';

@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [App],
})
export class AppModule {}
