import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-picture',
  templateUrl: './movie-picture.component.html',
  styleUrls: ['./movie-picture.component.css']
})
export class MoviePictureComponent implements OnInit {
  @Input() currentMoviePath: string;
  @Input() posterSize: number;
  baseUrl = 'https://image.tmdb.org/t/p/';
  availablePosterSizes: string[] = ['w92', 'w154', 'w185', 'w342', 'w500'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
