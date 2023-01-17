import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../service/movie-service';
import { IReview } from '../../models/review';
import { ActivatedRoute } from '@angular/router';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-all-reviews',
  templateUrl: './all-reviews.component.html',
  styleUrls: ['./all-reviews.component.css']
})
export class AllReviewsComponent implements OnInit {
  allReviews: Array<IReview>;
  id: number;
  constructor(private movieService: MovieService,
              private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    this.id = +params.get('id');
      });
    this.movieService.getMovieReviews(this.id).pipe(take(1)).subscribe((reviews) => {
    this.allReviews = (reviews.results);
    });
  }
}
