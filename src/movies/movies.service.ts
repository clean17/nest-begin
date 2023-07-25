import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }
    getOne(id: number): Movie{
        const movie = this.movies.find(movie => movie.id === +id);
        if(!movie) throw new NotFoundException(`The movie with this id(${id}) does not exist.`)
        return movie;
    }

    deleteOne(id: number): boolean {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== +id); // filter 는 새로운 배열 반환.. 다시 할당 필요
        return true;
    }

    create(movieData: CreateMovieDTO){
        this.movies.push({
            id: this.movies.length +1,
            ...movieData,
        })
    }

    update(id: number, updateData: UpdateMovieDTO) {
        let movie = this.getOne(id);
        const movies2 = this.movies.filter(movie => movie.id > +id);
        this.movies = this.movies.filter(movie => movie.id < +id);
        movie.title = updateData.title ? updateData.title : movie.title;
        movie.year = updateData.year ? updateData.year : movie.year;
        movie.genres = updateData.genres ? updateData.genres : movie.genres;
        this.movies.push(movie);
        this.movies.push(...movies2);
    }
}
