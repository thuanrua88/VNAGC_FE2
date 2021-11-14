import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/core/_service/category/category.service';
import { ProductService } from 'src/app/core/_service/product.service';
import { productContent } from 'src/app/models/listSale';
import { product } from 'src/app/models/product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateProductComponent implements OnInit {
  loading = true;
  listSale = productContent.listSale;
  listUnit = productContent.listUnit;
  listCategory = ["Fruit", "Drink", "Cake"]
  money = 0;
  // Step bar
  isEditable = true;
  // End Step bar
  formInfor: FormGroup;
  formImg: FormGroup;


  avatar;
  avatar_cover;
  list_img_feature: any = [{ data: '' }];
  product: product;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
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

      storage_instructions: ['']
    });

    this.formImg = this.fb.group({
    });
  }
  productId = this.activatedRoute.snapshot.paramMap.get('id');

  ngOnInit(): void {
    Promise.all(
      [
        this.getProduct(),
        this.getProductImgFeature(),
        this.getCategory()
      ]
    ).then(
      dt => {
        this.loading = false;
        this.setDataforForm(dt[0].Data);
        this.product = dt[0].Data;
        this.listCategory = dt[2].Data;
        this.avatar = this.product.banner_img;
        this.avatar_cover = this.product.cover_img;

        this.list_img_feature = dt[1].map(x => {
          if (x) { x.dataByDb = true }
          return x
        })
      }
    )
      .catch(
        rejects => {
          this.loading = false;
        }
      )
  }

  getCategory(): Promise<any> {
    return new Promise(async (resolve) => {
      const dt = await this.categoryService.getCategorys().toPromise();
      resolve(dt);
    });
  }

  getProduct(): Promise<any> {
    return new Promise(async (resolve) => {
      const dt = await this.productService.getProduct(this.productId).toPromise();
      resolve(dt);
    });
  }
  getProductImgFeature(): Promise<any> {
    return new Promise(async (resolve) => {
      const dt = await this.productService.GetImgProductFeature(this.productId).toPromise();
      resolve(dt);
    });
  }
  checkUpdateBannr = false;
  updateProduct() {
    let form = this.formInfor;
    let nowDate = new Date();
    let data = {
      "id": this.productId,
      "name": form.get('name').value,
      "banner_img": this.checkUpdateBannr ? this.avatarName : this.avatar,
      "cover_img": this.avatar_cover,
      "category_id": form.get('category').value,
      "price": form.get('price').value,
      "sale": form.get('sale').value,
      "description": form.get('description').value,
      "unit": form.get('unit').value,
      "storage_instructions": form.get('storage_instructions').value,
      "status": form.get('active').value ? 1 : 0,
      "view": this.product.view,
      "seller_id": this.product.seller_id,
      "create_at": this.product.create_at,
      "update_at": nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate() ,
    }
   
    console.log(data)
    this.loading = true;
    // if (this.checkUpdateBannr && this.upPhoto()) {
      this.productService.update(data).subscribe(
        dt => {
          this.sendImg()
        },
        err => {
          this.loading = false;
          console.log(err)
        }
      )
    // }
    
  }
  dataImage;
  data_avatar;
  avatarName;
  onSelectFile(e) {
    this.dataImage = e.target.files.item(0);
    let dateNow = new Date();

    if (e.target.files) { // Check File true : false
      var reader = new FileReader(); // DOM
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.checkUpdateBannr = true;

        this.avatarName = dateNow.getTime() + this.dataImage.name;
        this.data_avatar = event.target.result;
      }
    }
  }
  upPhoto() {
    const formData: FormData = new FormData();

    try {
      formData.append('ImageFile', this.dataImage, this.avatarName);
      this.productService.UpdateAvatar(formData).subscribe(() => {
      });
    }
    catch (e) {
      return false;
    }
    return true;
  }
  setDataforForm(dt) {
    this.formInfor.patchValue({
      name: dt.name,
      category: dt.category_id,
      price: dt.price,
      sale: dt.sale,
      description: dt.description,
      active: dt.status,
      unit: dt.unit,
      storage_instructions: dt.storage_instructions,
    })
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
    if (this.avatar == '') {
      this.avatar = '' + reader.result.substr(reader.result.indexOf(',') + 1);
    }
    else {
      this.avatar_cover = '' + reader.result.substr(reader.result.indexOf(',') + 1);
    }
  }
  setImgFeature(e) {
    let reader = e.target;
    this.list_img_feature[this.indexOflist_img_feature].avatar_feature = '' + reader.result.substr(reader.result.indexOf(',') + 1);
  }

  addSlotImgFeature() {
    if (this.list_img_feature.length != 0) {
      if (this.list_img_feature[this.list_img_feature.length - 1].avatar_feature) {
        this.list_img_feature.push({ dataByDb: false, avatar_feature: '' })
      }
    }
    else { this.list_img_feature.push({ dataByDb: false, avatar_feature: '' }) }
  }
  sendImg() {
    if (this.list_img_feature.length == 0) {
      this.route.navigate(["product/list"])
    }
    this.list_img_feature.forEach((item, index) => {
      let data = {
        "id": item.id,
        "product_id": this.productId,
        "avatar_feature": item.avatar_feature
      }
      if (item.id) {
        this.productService.updateImgFeature(data).subscribe(
          () => {
          },
          err => {
            this.route.navigate(["/err"]);
          }
        )
      }
      else {
        delete data.id
        this.productService.createImgFeature(data).subscribe(
          dt => {
            this.list_img_feature[index].id = dt.id;
          },
          err => {
            this.route.navigate(["/err"]);
          }
        )
      }
      if (index == this.list_img_feature.length - 1) {
        this.loading = false;
        this.route.navigate(["product/list"])
      }
    });
  }
}
