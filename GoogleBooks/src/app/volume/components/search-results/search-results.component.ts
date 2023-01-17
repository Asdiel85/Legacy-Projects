import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { VolumeService } from '../../services/volume.service';
import { IVolume } from '../../models/volume';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchParam: string;
  maxResults: string;
  results: IVolume[];
  showDeleteBtn = true;

  constructor(private route: ActivatedRoute,
              private volumeService: VolumeService) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.searchParam = params.get('title');
      this.maxResults = params.get('maxResults');
    });
    this.getSearchedBooks();
  }

  getSearchedBooks(): Subscription {
    return this.volumeService
      .getSearchedVolumes(this.searchParam, this.maxResults)
      .pipe(take(1)).subscribe(data => {
        this.results = data.items;
      });
  }
}
