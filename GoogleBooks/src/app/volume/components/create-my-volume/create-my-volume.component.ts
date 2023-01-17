import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VolumeService } from '../../services/volume.service';
import { map, take, timeout, timeoutWith } from 'rxjs/operators';
import { IVolume } from '../../models/volume';
import { Observable, pipe } from 'rxjs';

@Component({
  selector: 'app-create-my-volume',
  templateUrl: './create-my-volume.component.html',
  styleUrls: ['./create-my-volume.component.css']
})
export class CreateMyVolumeComponent implements OnInit {
  public createMyVolumeForm: FormGroup;
  volume: IVolume;

  constructor(private fb: FormBuilder,
              private router: Router,
              private volumeService: VolumeService,
              private route: ActivatedRoute) {
    this.createMyVolumeForm = this.fb.group({
      id: ['', [Validators.required], [this.asyncIdValidator()]],
      volumeInfo: this.fb.group({
        title: ['', [Validators.required]],
        authors: this.fb.array([
          this.fb.control('')
        ]),
        publisher: [''],
        publishedDate: [''],
        pageCount: [''],
        imageLinks: this.fb.group({
          thumbnail: ['']
        })
      })
    });
  }

  createMyVolume(): void {
    const volume: IVolume = this.createMyVolumeForm.value;
    volume.volumeInfo.authors = this.checkForEmptyAuthorInput(volume);
    this.volumeService.createMyVolume(volume)
      .subscribe(data => {
        this.router.navigateByUrl('favorites');
      });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const volumeId = params.get('id');
      if (volumeId) {
        this.getCurrentVolume(volumeId);
      }
    });
  }

  private getCurrentVolume(id: string): void {
    this.volumeService.getVolume(id).pipe(take(1)).subscribe(
      (volume: IVolume) => {
        this.editVolume(volume);
        this.volume = volume;
      }
    );
  }

  private editVolume(volume: IVolume): void {
    this.createMyVolumeForm.patchValue({
      id: volume.id,
      volumeInfo: {
        title: volume.volumeInfo.title,
        publisher: volume.volumeInfo.publisher,
        publishedDate: volume.volumeInfo.publishedDate,
        pageCount: volume.volumeInfo.pageCount,
        imageLinks: {
          thumbnail: volume.volumeInfo.imageLinks.thumbnail,
        }
      }
    });
    this.showExistingAuthors(volume);
  }

  get authors(): FormArray {
    return this.createMyVolumeForm.get('volumeInfo.authors') as FormArray;
  }

  removeCurrentAuthor(author: number): void {
    this.authors.removeAt(author);
  }

  addMoreAuthors(): void {
    this.authors.push(this.fb.control(''));
  }

  showExistingAuthors(volume: IVolume): void {
    (this.createMyVolumeForm.get('volumeInfo.authors') as FormArray).clear();
    volume.volumeInfo.authors.forEach(a => {
      const control = new FormControl(a);
      (this.createMyVolumeForm.get('volumeInfo.authors') as FormArray).push(control);
    });
  }

  checkForEmptyAuthorInput(volume: IVolume): string[] {
    return volume.volumeInfo.authors.filter(author => author !== '');
  }

  asyncIdValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.volumeService.getVolume(control.value).pipe(
        map(res => {
            if (res.id) {
              return {asyncValidation: 'failed'};
            }
            return null;
        })
      );
    };
  }

  get formControl() {
    return this.createMyVolumeForm.controls;
  }
}
