import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { AuthenService } from 'src/app/core/_service/authen/authen.service';
import { MustMatch } from 'src/app/_helpers/authen/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading = false;
  registerForm: FormGroup;
  errorName = false;

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
    this.initRegisterForm();
  }
  initRegisterForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.compose([
        Validators.required,
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,}')
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z0-9._%-]{6,30}')
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.required,
      ])]
    }, {
      validator: [MustMatch('password', 'confirmPassword')]
    });
  }
  f = (controlName: string) => this.registerForm.controls[controlName];
  isInvalid = (controlName: string) => {
    let c = this.f(controlName);
    return c && c.invalid && (c.dirty || c.touched);
  }
  submitForm() {
    const validateName = this.registerForm.controls.name.value.trimEnd();
    if (validateName == "") {
      this.errorName = true;
      return;
    } else {
      this.errorName = false
    }
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    let data = {
      "fullName": this.registerForm.controls.name.value,
      "email": this.registerForm.controls.email.value,
      "password": this.registerForm.controls.password.value,
      "isAdmin": false,
      "isShipper": false,
      "isActive": false,
      "type": 0,
      "status": false
    }
    this.loading = true;
    this.authenservice.register(data).subscribe(
      (dt: any) => {
        console.log(data, dt)
        this.sendMaillaAccNotActive(data, dt.Infor.Value.Id);
      },
      err => {
        err.error.Errors.forEach(element => {
          this.showError(element)
        });
        this.loading = false;
      }
    )
  }
  sendMaillaAccNotActive(e, id) {
    let val = {
      "ToEmail": `${e.email}`,
      "Body": `
        <table class="sm-w-full mx-auto" style="font-family: 'Montserrat',Arial,sans-serif; width: 600px; border:none" width="600" cellpadding="0"
  cellspacing="0" role="presentation">
  <tbody>
    <tr>
      <td align="center" class="sm-px-24" style="font-family: 'Montserrat',Arial,sans-serif;">
        <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%; border:none!important;
        box-shadow: 1px 1px 2px 2px #ccc;" width="100%; " cellpadding="0"
          cellspacing="0" role="presentation">
          <tbody>
            <tr>
              <td class="sm-px-24"
                style="--bg-opacity: 1; background-color: #ffffff; background-color: rgba(255, 255, 255, var(--bg-opacity)); border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', border: none;sans-serif; font-size: 14px; line-height: 24px; padding: 48px; text-align: left; --text-opacity: 1; color: #626262; color: rgba(98, 98, 98, var(--text-opacity));"
                bgcolor="rgba(255, 255, 255, var(--bg-opacity))" align="left">
                <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">Hey</p>
                <p
                  style="font-weight: 700; font-size: 20px; margin-top: 0; --text-opacity: 1; color: #ff5850; color: rgba(255, 88, 80, var(--text-opacity));">
                  ${e.fullName}!</p>
                <p class="sm-leading-32"
                  style="font-weight: 600; font-size: 20px; margin: 0 0 16px; --text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity));">
                  Thanks for signing up! 👋
                </p>
                <p style="margin: 0 0 24px;">
                  Please verify your email address by clicking the below button and join our creative community,
                  start exploring the resources or showcasing your work.
                </p>
                <p style="margin: 0 0 24px;">
                  If you did not sign up to 4TĐ, please ignore this email or contact us at
                  <a href="mailto:realvilla1909m@gmail.com" class="hover-underline"
                    style="--text-opacity: 1; color: #7367f0; color: rgba(115, 103, 240, var(--text-opacity)); text-decoration: none;">realvilla1909m@gmail.com</a>
                </p>
               
                <table style="font-family: 'Montserrat',Arial,sans-serif;" cellpadding="0" cellspacing="0"
                  role="presentation">
                  <tbody>
                    <tr>
                      <td
                        style="mso-padding-alt: 16px 24px; --bg-opacity: 1; background-color: #7367f0; background-color: rgba(115, 103, 240, var(--bg-opacity)); border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;"
                        bgcolor="rgba(115, 103, 240, var(--bg-opacity))">
                        <a href="http://localhost:4200/activeAccount/${id}"
                          style="display: block; font-weight: 600; font-size: 14px; line-height: 100%; padding: 16px 24px; --text-opacity: 1; color: #ffffff; color: rgba(255, 255, 255, var(--text-opacity)); text-decoration: none;">Verify
                          Email Now →</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
               
                <p style="margin: 0 0 16px;">
                  Not sure why you received this email? Please
                  <a href="mailto:realvilla1909m@gmail.com" class="hover-underline"
                    style="--text-opacity: 1; color: #7367f0; color: rgba(115, 103, 240, var(--text-opacity)); text-decoration: none;">let
                    us know</a>.
                </p>
                <p style="margin: 0 0 16px;">Thanks, <br>The 4TĐ Team</p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
        `,
      "Subject": "Welcome Bartending Drink"
    }
    this.authenservice.sendMail(val).subscribe(
      data => {
        this.router.navigate(["/"])
        this.loading = false;
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
    this.toasterService.pop('success', this.modal_info_title, mess);
  }
  showError(mess) {
    this.toasterService.pop('error', this.modal_error_title, mess);
  }
}
