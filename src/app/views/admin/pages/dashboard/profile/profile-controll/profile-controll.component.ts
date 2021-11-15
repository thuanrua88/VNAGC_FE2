import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../../../../core/validators/CustomValidators';
import { ProfileService } from '../../../../../../core/_service/profile/profileService..service';
import { user } from '../../../../../../models/user';

@Component({
  selector: 'app-profile-controll',
  templateUrl: './profile-controll.component.html',
  styleUrls: ['./profile-controll.component.css']
})
export class ProfileControllComponent implements OnInit {
  formInfor: FormGroup;
  userId;
  user: user;
  load = true;
  avatar;
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {
    this.userId = JSON.parse(sessionStorage.getItem("user")).id;
    this.res();
  }

  ngOnInit(): void {
    this.profileService.getProfile(this.userId).subscribe(
      dt => {
        this.load = false;
        this.user = dt.Data[0];
        this.avatar = this.user.avatar;
        console.log(this.user)
        this.formInfor.patchValue({
          fname: this.user.fullName,
          phone: this.user.phoneNumber,
          address: this.user.Address,
        })
      })
  }
  res() {
    this.formInfor = this.fb.group(
      {
        fname: [null, Validators.compose([
          Validators.required,
          CustomValidators.noWhitespace(),
          CustomValidators.byteMatch(105)
        ])],
        phone: [null, Validators.compose([
          Validators.required,
          CustomValidators.byteMatch(11)
        ])],
        address: [null]
      }
    )
  }
  f(control) {
    return this.formInfor.controls[control]
  }
  isInvalid(controlName) {
    if (this.formInfor) {
      let c = this.f(controlName);
      return c && c.invalid && (c.dirty || c.touched);
    } else {
      return null;
    }
  }
  permitFile;
  indexOflist_img_feature = 0;
  updateFile(event, type) {
    let fileList: FileList = event.target.files;
    const file: File = fileList[0];
    this.permitFile = file;
    this.handleInputChange(file, type, 0); //turn into base64
  }

  updateListFile(event, index) {
    let fileList: FileList = event.target.files;
    const file: File = fileList[0];
    this.permitFile = file;
    this.handleInputChange(file, index, 1); //turn into base64
  }
  handleInputChange(files, type, isListImgFeature) {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    else {
      if (type) {
        reader.onloadend = this.setValueAvatar.bind(this);
      }
    }

    reader.readAsDataURL(file);
  }
  setValueAvatar(e) {
    let reader = e.target;
    this.avatar = '' + reader.result.substr(reader.result.indexOf(',') + 1);
  }
  update() {
    if (this.formInfor.invalid) {
      this.formInfor.markAllAsTouched();
      return
    }
    let data = {
      "fullName": this.formInfor.controls['fname'].value,
      "phoneNumber": this.formInfor.controls['phone'].value,
      "address": this.formInfor.controls['address'].value,
      "avatar": this.avatar
    };

    this.load = true;
    this.profileService.updateProfile(data).subscribe(
      dt => {
        //window.location.reload();
      })
  }
}
