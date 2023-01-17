import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-volumes',
  templateUrl: './search-volumes.component.html',
  styleUrls: ['./search-volumes.component.css']
})
export class SearchVolumesComponent {
  public volumesSearchForm: FormGroup;
  @Input() isForSearchResults: boolean;

  constructor(private fb: FormBuilder,
              private router: Router) {
    this.volumesSearchForm = this.fb.group({
      volumeTitle: ['', [Validators.required]],
      volumeCount: ['10']
    });
  }

  get formControl() {
    return this.volumesSearchForm.controls;
  }

  searchFormSubmit(): void {
    this.router
      .navigate(['results'], {
          queryParams: {
            title: this.volumesSearchForm.value.volumeTitle,
            maxResults: this.volumesSearchForm.value.volumeCount
          }
        }
      );
  }
}
