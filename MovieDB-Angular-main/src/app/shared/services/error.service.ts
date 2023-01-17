import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorPopupComponent } from '../components/error-popup/error-popup.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private modal: NgbModal) { }

  displayError(errors: string) {
    const errorModal = this.modal.open(ErrorPopupComponent);
    errorModal.componentInstance.errorMessage = errors;
  }
}
