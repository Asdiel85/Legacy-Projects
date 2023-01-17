import { Component, OnInit } from '@angular/core';
import { IActor } from '../../models/actor';
import { MovieService } from '../../service/movie-service';
import { ActivatedRoute } from '@angular/router';
import {take} from 'rxjs/operators';


@Component({
  selector: 'app-full-cast',
  templateUrl: './full-cast.component.html',
  styleUrls: ['./full-cast.component.css']
})
export class FullCastComponent implements OnInit {

  allActors: Array<IActor>;
  id: number;

  constructor(private route: ActivatedRoute,
              private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id');
    });
    this.movieService.getMovieCredits(this.id).pipe(take(1)).subscribe(data => {
      this.allActors = (data.cast);
    });
  }

}
