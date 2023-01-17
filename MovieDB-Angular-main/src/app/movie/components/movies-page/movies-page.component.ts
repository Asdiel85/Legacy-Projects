import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../../service/movie-service';
import { IMovie } from '../../models/movie';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.css']
})
export class MoviesPageComponent implements OnInit {
  popular: Array<IMovie>;
  page = 1;
  lastPage: number;

  constructor(private movieService: MovieService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(data => {
      if (+data.get('currentPage') > 1) {
        this.page = +data.get('currentPage');
      }
    });
    this.movieService
      .getPopularMovieList(this.page).pipe(take(1))
      .subscribe(data => {
        this.popular = data.results;
        this.lastPage = data.total_pages;
      });
  }
}

