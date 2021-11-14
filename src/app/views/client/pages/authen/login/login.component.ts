import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { AuthenService } from 'src/app/core/_service/authen/authen.service';
import { MustMatch } from 'src/app/_helpers/authen/must-match.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  loginForm: FormGroup;
  errorName = false;
  err_pass ='Invalid password';
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });
  modal_info_title = 'Success';
  modal_error_title = 'Error'
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private authenservice: AuthenService,
    toasterService: ToasterService,
  ) {
    this.toasterService = toasterService;
  }

  ngOnInit(): void {
    this.initLoginForm();
  }
  initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,}')
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])],
      remember: [false]
    });
  }
  f = (controlName: string) => this.loginForm.controls[controlName];
  isInvalid = (controlName: string) => {
    let c = this.f(controlName);
    return c && c.invalid && (c.dirty || c.touched);
  }

  submitForm() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    let data = {
      "email": this.loginForm.controls.email.value,
      "password": this.loginForm.controls.password.value,
    }
    this.loading = true;
    this.authenservice.login(data).subscribe(
      (dt: any) => {
        if (dt.Infor.Value.isAdmin) {
            sessionStorage.setItem("token", dt.Token);
            this.authenservice.currentTokenSubject.next(dt.Token);

            sessionStorage.setItem("user", JSON.stringify(dt.Infor.Value));
            this.authenservice.currentUserSubject.next(dt.Infor.Value);

            
              this.router.navigate(["/admin"])
            }
        else {
          this.showError("The account has not been activated, please check your email to activate the account");
          this.loading = false;
        }
      },
      err => {
        err.error.Errors.forEach(element => {
          this.showError(element)
        });
        this.loading = false;
      }
    )
  }

  showSuccess(mess) {
    // this.toasterService.pop('success', this.modal_info_title, mess);
  }
  showError(mess) {
    // this.toasterService.pop('error', this.modal_error_title, mess);
  }
}
