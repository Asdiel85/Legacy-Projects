import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private modal: NgbModal) {
  }

  displayError(errors: string): void {
    const errorModal = this.modal.open(ErrorModalComponent);
    errorModal.componentInstance.errorMessage = errors;
  }
}
