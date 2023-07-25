import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }
    @Get(':id')
    getOne(@Param('id') mId: string ): Movie {
        return this.moviesService.getOne(mId);
    }
    @Get('search')
    search(@Query('keyword') keyword: string) {
      return `Searching ${keyword}`;
    }

    @Post()
    create(@Body() movieData) {
        return this.moviesService.create(movieData);
    }

    @Patch(':id')
    path(@Param('id') movieId: string, @Body() updateData) {
        // return {
        //     updateMovie: movieId,
        //     ...updateData,
        // }
        return this.moviesService.update(movieId, updateData);
    }

    @Delete(':id')
    remove(@Param('id') movidId: string): boolean{
        return this.moviesService.deleteOne(movidId);
    }
}
