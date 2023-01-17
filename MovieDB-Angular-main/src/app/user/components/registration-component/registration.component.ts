import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatch } from '../../../shared/directives/validators';
import { RegistrationService } from '../../registration.service';
import { IUser } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public registrationForm: FormGroup;
  model: IUser;

  constructor(fb: FormBuilder,
              private regService: RegistrationService,
              private router: Router) {
    this.registrationForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required]]
    }, {validators: passwordMatch});
  }

  ngOnInit(): void {
  }

  get formControl() {
    return this.registrationForm.controls;
  }

  createUser(): void {
    this.regService.register(this.registrationForm.value)
      .subscribe(data => {
          this.router.navigate(['/popular']);
        }
      );
  }

}
