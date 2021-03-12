import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  user = User;
  submitted = false;
  errorMessage: string;

  @ViewChild('resetRegistrationForm') resetForm: any;
  registrationForm: FormGroup;

  constructor(private userService: UserService, public formBuilder: FormBuilder, private ngZone: NgZone, private router: Router) { }

  ngOnInit(): void {
    this.submitForm();
  }

  submitForm() {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      dob: ['', [Validators.required]]
    })
  }

  /* Date */
  formatDate(fieldName: string | (string | number)[], e: { target: { value: string | number | Date; }; }) {
    var convertedDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.registrationForm.get(fieldName).setValue(convertedDate, {
      onlyself: true
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.registrationForm.controls[controlName].hasError(errorName);
  }

  submitRegistrationForm() {
    if (this.registrationForm.valid) {
      this.userService.createUser(this.registrationForm.value)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this.ngZone.run(() => { this.router.navigate(['/login']) });
          },
          error => {
            this.errorMessage = error;
          });
    }
  }

}
