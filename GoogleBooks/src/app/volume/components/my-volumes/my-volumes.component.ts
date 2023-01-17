import { Component, OnInit } from '@angular/core';
import { VolumeService } from '../../services/volume.service';
import { take } from 'rxjs/operators';
import { IVolume } from '../../models/volume';

@Component({
  selector: 'app-favorite-volumes',
  templateUrl: './my-volumes.component.html',
  styleUrls: ['./my-volumes.component.css']
})
export class MyVolumesComponent implements OnInit {
  myVolumes: Array<IVolume>;
  showDeleteBtn = false;

  constructor(private volumeService: VolumeService) {
  }

  ngOnInit(): void {
    this.volumeService.getMyVolumes().pipe(take(1)).subscribe(data => {
      this.myVolumes = [];
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const volume = data[key];
          this.myVolumes.push(volume);
        }
      }
    });
  }

  deleteMyVolume(volume: IVolume): void {
    this.myVolumes = this.myVolumes.filter(vol => vol.id !== volume.id);
    this.volumeService.deleteMyVolume(volume).pipe(take(1)).subscribe();
  }
}
