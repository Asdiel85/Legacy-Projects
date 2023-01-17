import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CREDITS,
  MOVIES,
  POPULAR,
  RECOMMENDATIONS,
  REVIEWS
} from '../../constants/constants';
import { Observable } from 'rxjs';
import { IMovies } from '../models/movie';
import { IMovieDetails } from '../models/movie-details';
import { IReviews } from '../models/review';
import { IActors } from '../models/actor';

@Injectable()
export class MovieService {

  constructor(private http: HttpClient) {

  }

  /**
   *  REQUEST FOR MOST POPULAR MOVIES
   */
  getPopularMovieList(page: number): Observable<IMovies> {
    return this.http.get<IMovies>(`${MOVIES}${POPULAR}?page=${page}`);
  }

  /**
   * REQUEST FOR MOVIE DETAILS
   */
  getCurrentMovie(id: number): Observable<IMovieDetails> {
    return this.http.get<IMovieDetails>(`${MOVIES}${id}`);
  }

  /**
   * REQUEST FOR MOVIE ACTORS
   */
  getMovieCredits(id: number): Observable<IActors> {
    return this.http.get<IActors>(`${MOVIES}${id}${CREDITS}`);
  }

  /**
   * REQUEST FOR MOVIE REVIEWS
   */
  getMovieReviews(id: number): Observable<IReviews> {
    return this.http.get<IReviews>(`${MOVIES}${id}${REVIEWS}`);
  }

  /**
   * REQUEST FOR RECOMMENDED MOVIES
   */
  getMovieRecommendations(id: number): Observable<IMovies> {
    return this.http.get<IMovies>(`${MOVIES}${id}${RECOMMENDATIONS}`);
  }
}

