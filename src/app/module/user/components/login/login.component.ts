import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage: string;

  @ViewChild('resetLoginForm') resetForm: any;
  loginForm: FormGroup;

  constructor(private userService: UserService, public formBuilder: FormBuilder, private ngZone: NgZone, private router: Router) { }

  ngOnInit(): void {
    this.submitForm();
  }

  submitForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  submitLoginForm() {
    if (this.loginForm.valid) {
      this.userService.authenticateUser(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
          response => {
            console.log(response);
            this.ngZone.run(() => { this.router.navigate(['/list-members']) });
          },
          error => {
            this.errorMessage = error;
          });
    }
  }

}
