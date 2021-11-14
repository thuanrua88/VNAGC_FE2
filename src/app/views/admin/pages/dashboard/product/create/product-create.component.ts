import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/core/_service/category/category.service';
import { ProductService } from 'src/app/core/_service/product.service';
import { productContent } from 'src/app/models/listSale';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  urlImg = this.prductService.urlImg;
  loading = false;
  listSale = productContent.listSale;
  listUnit = productContent.listUnit;
  listCategory = ['y']
  // Step bar
  isEditable = true;
  // End Step bar

  formInfor: FormGroup;
  formImg: FormGroup;

  avatar=null;
  avatar_cover;
  list_img_feature: any = [];
  dataImage;
  data_avatar;
  avatarName;
  constructor(
    private fb: FormBuilder,
    private prductService: ProductService,
    private route: Router,
    private categoryService: CategoryService
  ) {
    this.formInfor = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: [null, Validators.required],
      sale: [0],
      description: [''],
      unit: ['', Validators.required],
      active: [true],

      storage_instructions: [''],
    });

    this.formImg = this.fb.group({
      avatar: [null, Validators.required],
      // avatar_cover: ['',],
      // listImg_feature: new FormArray([]),
    });
  }

  ngOnInit(): void {
    Promise.all(
      [
        this.getCategory()
      ]
    ).then(
      (dt: any) => {
        console.log(dt)
        this.listCategory = dt[0].Data;
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    )
  }
  createProduct() {
    let form = this.formInfor;
    let nowDate = new Date();
    let data = {
      "name": form.get('name').value,
      "banner_img": this.avatar,
      "cover_img": this.avatar_cover,
      "category": form.get('category').value,
      "price": form.get('price').value,
      "sale": form.get('sale').value,
      "description": form.get('description').value,
      "unit": form.get('unit').value,
      "storage_instructions": form.get('storage_instructions').value,
      "status": form.get('active').value ? 1 : 0,
      
      "seller_id": JSON.parse(sessionStorage.getItem("user")).id,
      "create_at": nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate(),
      "update_at": nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate(),
    }
    this.loading = true;
      this.prductService.create(data).subscribe(
        dt => {
          this.sendImg(dt)
          this.route.navigate(["product/list"])
        },
        err => {
          this.loading = false;
        }
      )
    
  }

  onSelectFile(e) {
    this.dataImage = e.target.files.item(0);
    let dateNow = new Date();

    if (e.target.files) { // Check File true : false
      var reader = new FileReader(); // DOM
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.avatarName = dateNow.getTime() + this.dataImage.name;
        this.data_avatar = event.target.result;
      }
    }
  }
  upPhoto() {
    const formData: FormData = new FormData();

    try {
      formData.append('ImageFile', this.dataImage, this.avatarName);
      this.prductService.UpdateAvatar(formData).subscribe(() => {
      });
    }
    catch (e) {
      return false;
    }
    return true;
  }

  getCategory(): Promise<any> {
    return new Promise(async (resolve) => {
      const dt = await this.categoryService.getCategorys().toPromise();
      resolve(dt);
    });
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
    if (isListImgFeature) {
      reader.onloadend = this.setImgFeature.bind(this);
      this.indexOflist_img_feature = type;
    }
    else {
      if (type) {
        reader.onloadend = this.setValueAvatar.bind(this);
      }
      else {
        reader.onloadend = this.setValueAvatarCover.bind(this);
      }
    }

    reader.readAsDataURL(file);
  }
  setValueAvatar(e) {
    let reader = e.target;
    this.avatar = '' + reader.result.substr(reader.result.indexOf(',') + 1);
  }
  setValueAvatarCover(e) {
    let reader = e.target;
    if (this.avatar=='') {
      this.avatar = '' + reader.result.substr(reader.result.indexOf(',') + 1);
    }
    else {
      this.avatar_cover = '' + reader.result.substr(reader.result.indexOf(',') + 1);
    }
  }
  setImgFeature(e) {
    let reader = e.target;
    this.list_img_feature[this.indexOflist_img_feature].data = '' + reader.result.substr(reader.result.indexOf(',') + 1);
  }

  addSlotImgFeature() {
    if (this.list_img_feature.length != 0) {
      if (this.list_img_feature[this.list_img_feature.length - 1].data) {
        this.list_img_feature.push({ data: '' })
      }
    }
    else { this.list_img_feature.push({ data: '' }) }
  }

  sendImg(val) {
    if (this.list_img_feature.length == 0) {
      this.route.navigate(["product/list"])
    }
    this.list_img_feature.forEach((item, i) => {
      let data = {
        "product_id": val.id,
        "avatar_feature": item.data
      }
      this.prductService.createImgFeature(data).subscribe(
        dt => {
          this.loading = false;
          if (i == this.list_img_feature - 1) { this.route.navigate(["product/list"])}
        },
        err => {
          this.loading = false;
        }
      )
    });
  }
}
