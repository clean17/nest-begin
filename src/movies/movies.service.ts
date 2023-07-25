import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }
    getOne(id: string): Movie{
        const movie = this.movies.find(movie => movie.id === +id);
        if(!movie) throw new NotFoundException(`The movie with this id(${id}) does not exist.`)
        return movie;
    }

    deleteOne(id: string): boolean {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== +id); // filter 는 새로운 배열 반환.. 다시 할당 필요
        return true;
    }

    create(movieData: Movie){
        this.movies.push({
            id: this.movies.length +1,
            ...movieData,
        })
    }

    update(id: string, updateData: Movie) {
        this.getOne(id);
        this.deleteOne(id);
        const movies2 = this.movies.filter(movie => movie.id > +id);
        this.movies = this.movies.filter(movie => movie.id < +id);
        this.create(updateData);
        this.movies.push(...movies2);
    }
}
