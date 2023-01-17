import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IVolume } from '../../models/volume';
import { Router } from '@angular/router';
import { VolumeService } from '../../services/volume.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.css']
})
export class VolumeComponent {
  @Input() showDeleteBtn: boolean;
  @Input() volume: IVolume;
  @Output() delete = new EventEmitter<IVolume>();

  constructor(private router: Router,
              private volumeService: VolumeService) {
  }

  openVolumeDetails(id): void {
    this.router.navigate(['/volumes', id]);
  }

  deleteVolume(volume): void {
    this.delete.emit(volume);
  }

  editButtonClick(volumeId: string): void {
    this.router.navigate(['/edit', volumeId]);
  }

  addVolume(): void {
    this.volumeService.createMyVolume(this.volume).pipe(take(1)).subscribe(data => {
    });
  }
}
