import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../service/movie-service';
import { IActor } from '../../models/actor';
import { IReview } from '../../models/review';
import { IMovie } from '../../models/movie';
import { IMovieDetails } from '../../models/movie-details';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-current-movie',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  @Input() end: number;
  currentMovie: IMovieDetails;
  allActors: Array<IActor>;
  reviews: Array<IReview>;
  recommendations: Array<IMovie>;
  id: number;

  constructor(private route: ActivatedRoute,
              private movieService: MovieService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
    this.getCurrentMovie();
    this.getCredits();
    this.getReviews();
    this.getRecommendations();
  }

  private getCurrentMovie(): void {
    this.movieService.getCurrentMovie(this.id).pipe(take(1)).subscribe(data => {
      this.currentMovie = data;
    });
  }

  private getCredits(): void {
    this.movieService.getMovieCredits(this.id).pipe(take(1)).subscribe(data => {
      this.allActors = (data.cast);
    });
  }

  private getReviews(): void {
    this.movieService.getMovieReviews(this.id).pipe(take(1)).subscribe(data => {
      this.reviews = (data.results);
    });
  }

  private getRecommendations(): void {
    this.movieService.getMovieRecommendations(this.id).pipe(take(1)).subscribe(data => {
      this.recommendations = (data.results);
    });
  }
}
