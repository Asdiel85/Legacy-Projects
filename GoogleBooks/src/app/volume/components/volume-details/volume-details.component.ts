import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VolumeService } from '../../services/volume.service';
import { IVolume } from '../../models/volume';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-volume-details',
  templateUrl: './volume-details.component.html',
  styleUrls: ['./volume-details.component.css']
})
export class VolumeDetailsComponent implements OnInit {
  id: string;
  currentVolume: IVolume;

  constructor(private route: ActivatedRoute,
              private volumeService: VolumeService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
    this.getVolumeDetails();
  }

  private getVolumeDetails(): void {
    this.volumeService.getCurrentVolumeDetails(this.id)
      .pipe(take(1)).subscribe(data => {
      this.currentVolume = data;
    });
  }
}
