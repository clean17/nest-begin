import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, Res } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
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
    getOne(@Param('id') mId: number ): Movie {
        console.log(typeof mId);
        return this.moviesService.getOne(mId);
    }
    @Get('search')
    search(@Query('keyword') keyword: string) {
      return `Searching ${keyword}`;
    }

    @Post()
    create(@Body() movieData: CreateMovieDTO) {
        return this.moviesService.create(movieData);
    }

    @Patch(':id')
    path(@Param('id') movieId: number, @Body() updateData: UpdateMovieDTO) {
        // return {
        //     updateMovie: movieId,
        //     ...updateData,
        // }
        return this.moviesService.update(movieId, updateData);
    }

    @Delete(':id')
    remove(@Param('id') movidId: number): boolean{
        return this.moviesService.deleteOne(movidId);
    }
}
