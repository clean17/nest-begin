import { NotFoundException } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { execPath } from 'process';
import { Movie } from './entities/movie.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let moviesController: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    moviesController = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be completed', () => {
    expect(2 + 2).toEqual(4);
  })

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
    it('should return an array of movies', async () => {
      const result: Movie[] = [];
      jest.spyOn(service, 'getAll').mockImplementation(() => result);

      expect(await moviesController.getAll()).toBe(result);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2022,
        genres: ["test"]
      });
      expect(service.getOne(1).title).toBe('Test Movie');
    })
    it('should throw 404 error', () => {
      try {
        service.getOne(112516);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    })
  })

  describe('deleteOne', () => {
    it('delete a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2022,
        genres: ["test"]
      });
      expect(service.getAll().length).toEqual(1);
      service.deleteOne(1);
      const AfterMovies = service.getAll();
      expect(AfterMovies.length).toEqual(0);
    })
  })

  describe('create', () => {
    it('create a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2022,
        genres: ["test"]
      });
      expect(service.getOne(1).title).toEqual('Test Movie');
    })
  })

  describe('update', () => {
    it('update a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2022,
        genres: ["test"]
      });
      service.update(1, {
        title: 'Test Movie2'
      });
      expect(service.getOne(1).title).toEqual('Test Movie2');
    });
    it('should throw a NotFoundException', () => {
      try {
        service.update(12415, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  })
});