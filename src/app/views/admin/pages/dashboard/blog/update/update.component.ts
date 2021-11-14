import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomValidators } from 'src/app/core/validators/CustomValidators';
import { BlogService } from 'src/app/core/_service/blog/blog.service';
import { CategoryService } from 'src/app/core/_service/category/category.service';
import { HashtagService } from 'src/app/core/_service/hashtag/hashtag.service';
import { ProductService } from 'src/app/core/_service/product.service';
import { blog } from 'src/app/models/blog';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  listCategory = ["Tea", "Coffe", "Coca"];
  time = { hour: 13, minute: 30 };
  selectedHastags: any[];
  hastags: any[] = [
    { id: 1, viewValue: "material saving" },
    { id: 2, viewValue: "easy" },
    { id: 3, viewValue: "fast" },
    { id: 4, viewValue: "sweet things" },
    { id: 5, viewValue: "Appetizer" }
  ];
  listUnit = ["gam", "liter", "ml", "bottle"]
  formBlog: FormGroup;
  isCollapsed = {
    metarial: false,
    step: false,
    content: false
  };

  avatar;
  avatar_cover;
  list_img_step: any = [{ data: '' }];
  list_img_content: any = [{ data: '' }];

  loading = true;
  isSuccess = false;
  checkUpdateSuccess = false;
  userId;
  listProduct;
  listProductRoot;
  listMetarialShop = [];
  myControl: FormControl = new FormControl();
  filteredOptions: Observable<string[]>;
  blogDetail:blog;
  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private hashtagService: HashtagService,
    private productService: ProductService
  ) {
    this.registerFormBlog();

    this.userId = JSON.parse(sessionStorage.getItem("user")).id;
  }
  blogId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

  ngOnInit(): void {
    Promise.all([
      this.getBlog(),
      this.getCategory(),
      this.getHashtag(),
      this.getProduct()
    ]).then(
      dt => {
        this.loading = false;
        this.listCategory = dt[1].Data;
        this.hastags = dt[2].Data;
        this.listProduct = dt[3].Data;
        this.listProductRoot = dt[3].Data;
        // this.setFormMetarial(dt[1])
        // this.setFormContent(dt[2])
        // this.setFormSteps(dt[3])
        this.setFormBlog(dt[0].Data)
        this.blogDetail = dt[0].Data;
        console.log(dt[0].Data)
      }
    )
  }

    f(control) {
    return this.formBlog.controls[control]
  }

  isInvalid(controlName) {
    if (this.formBlog) {
      let c = this.f(controlName);
      return c && c.invalid && (c.dirty || c.touched);
    } else {
      return null;
    }
  }

   getProduct(): Promise<any> {
    return new Promise(async (resolve) => {
      const dt = await this.productService.getAllProducts().toPromise();
      resolve(dt);
    });
  }

  // Add metarial 
  pushMetarial(val) {
    if (this.listMetarialShop.length == 0) {
      this.listMetarialShop.push(val);
    }
    else {
      for (let index = 0; index < this.listMetarialShop.length; index++) {
        let e = this.listMetarialShop[index];
        if (val.id != e.id) {
          if ((index == this.listMetarialShop.length - 1)){
            this.listMetarialShop.push(val);
            break;
          }
        }
        if (val.id == e.id) {
          this.listMetarialShop.splice(index, 1);
          break;
        }
      }
    }
  }

  unshifMetarial(idex) {
    this.listMetarialShop.splice(idex, 1);
  }
  searchMetarial(val) {
    if (val.trim() != '') {
      this.listProduct = this.filterStates(val);
    }
    else {
      this.listProduct = this.listProductRoot;
    }
  }

  filterStates(name: string) {
    return this.listProduct.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  // End metarial

  getCategory(): Promise<any> {
    return new Promise(async (resolve) => {
      const dt = await this.categoryService.getCategorys().toPromise();
      resolve(dt);
    });
  }

  getHashtag(): Promise<any> {
    return new Promise(async (resolve) => {
      const dt = await this.hashtagService.getHashtags().toPromise();
      resolve(dt);
    });
  }

  createBlog() {
    let form = this.formBlog;
    if (form.invalid || this.avatar == null || this.avatar == '') {
      if (this.avatar == null || this.avatar == '') { this.avatar = ''; }
      this.formBlog.markAllAsTouched();
      window.scrollTo(0, 0)
      return
    }
    let nowDate = new Date();
    let data = {
      "id": this.blogId,
      "name": form.get('name').value,
      "banner_img": this.avatar,
      "cover_img": this.avatar_cover,
      "cooking_time": form.get('cooking_time').value,
      "summary": form.get('name').value,
      "description": form.get('description').value,
      "url_video_youtube": form.get('url_video_youtube').value,
      "view": this.blogDetail.view,
      "steps": form.get('step').value,
      "status": 1,
      "user_id": this.userId,
      "category_id": form.get('category').value,
      "productIds": [
        
      ],

      "create_at": nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate(),
      "update_at": nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate(),
    }
    console.log(data)
    this.listMetarialShop.length > 0 ? data.productIds = this.listMetarialShop.map(e => e.id) : 0
    this.loading = true;
    this.blogService.update(data).subscribe(
      dt => {
        // setTimeout(() => {
          this.route.navigate(["/blog/blog-detail", { id: this.blogId }]);
        // }, 1500);
        // this.createMetarial();
        // this.createContent();
        // this.createStep()
      },
      err => {
        this.loading = false;
      }
    )
  }

  setFormContent(val) {
    console.log(val)
    val.forEach(e => {
      this.listContent().push(
        this.fb.group({
          id: [e.id, Validators.compose(
            [Validators.required]
          )],
          title: [e.name, Validators.compose(
            [Validators.required]
          )],
          avatar: [e.banner_img],
          avatar_cover: [e.banner_cover],
          description: [e.content]
        })
      )
    });
  }

  setFormSteps(val) {
    val.forEach(e => {
      this.listStep().push(
        this.fb.group({
          id: [e.id, Validators.compose(
            [Validators.required]
          )],
          name: [e.name, Validators.compose(
            [Validators.required]
          )],
          description: [e.desciption, Validators.compose(
            [Validators.required]
          )],
          avatar: [e.banner_img, Validators.compose(
            [Validators.required]
          )]
        })
      )
    });
  }

  setFormMetarial(val) {
    val.forEach(e => {
      this.listMetarial().push(
        this.fb.group({
          id: [e.id, Validators.compose(
            [Validators.required]
          )],
          name: [e.title, Validators.compose(
            [Validators.required]
          )],
          content: [e.mass, Validators.compose(
            [Validators.required]
          )],
          unit: [e.unit, Validators.compose(
            [Validators.required]
          )]
        })
      )
    });
  }

  registerFormBlog() {
    this.formBlog = this.fb.group(
      {
        name: [null, Validators.compose([
          Validators.required,
          CustomValidators.noWhitespace(),
          CustomValidators.byteMatch(105)
        ])],
        category: [null, Validators.compose([
          Validators.required
        ])],
        hashTag: [null],
        cooking_time: [null],
        // unitTimeCook: ['mins'],
        // summary: [null, Validators.compose([
        //   Validators.required
        // ])],
        description: [null, Validators.compose([
          Validators.required
        ])],
        url_video_youtube: [null],
        step: [null, Validators.compose([
          Validators.required
        ])],
        // name: [null, Validators.compose([
        //   Validators.required
        // ])],
        // category: [null, Validators.compose([
        //   Validators.required
        // ])],
        // hashTag: [null],
        // cooking_time: [null],
        // summary: [null],
        // description: [null],
        // url_video_youtube: [null],
        // status: [false],
        // unitTimeCook: [null],


        // metarial: this.fb.array([]),
        // step: this.fb.array([]),
        // content: this.fb.array([])
      }
    )
  }

  setFormBlog(val) {
   
    val.materials.forEach((e, indexProduct) => {
      for (let index = 0; index < this.listProduct.length; index++) {
        let ei = this.listProduct[index];
        if (e.productId == ei.id) {
          this.listMetarialShop.push(ei);
          break;
        }
      }
    });
    this.formBlog.patchValue(
      {
        name: val.name,
        category: val.category_id,
        hashTag: [1],
        cooking_time: val.cooking_time,

        summary: val.summary,
        description: val.description,
        url_video_youtube: val.url_video_youtube,
        status: val.status,
        step: val.steps
      }
    )
    this.avatar = val.banner_img;
    this.avatar_cover = val.cover_img;
  }

  getBlog(): Promise<any> {
    return new Promise(
      async (resolve) => {
        const dt = this.blogService.getBlog(this.activatedRoute.snapshot.paramMap.get('id')).toPromise();
        return resolve(dt)
      }
    )

  }
  getMetarial(): Promise<any> {
    return new Promise(
      async (resolve) => {
        const dt = this.blogService.getMetarial(this.activatedRoute.snapshot.paramMap.get('id')).toPromise();
        return resolve(dt)
      }
    )
  }

  getContents(): Promise<any> {
    return new Promise(
      async (resolve) => {
        const dt = this.blogService.getContents(this.activatedRoute.snapshot.paramMap.get('id')).toPromise();
        return resolve(dt)
      }
    )
  }

  getStep(): Promise<any> {
    return new Promise(
      async (resolve) => {
        const dt = this.blogService.getStep(this.activatedRoute.snapshot.paramMap.get('id')).toPromise();
        return resolve(dt)
      }
    )
  }

  listStep = () => {
    return (this.formBlog.get('step') as FormArray).controls;
  }
  addStep() {
    if (this.listStep().length == 0) {
      return this.listStep().push(
        this.fb.group({
          id: [0, Validators.compose(
            [Validators.required]
          )],
          name: [null, Validators.compose(
            [Validators.required]
          )],
          description: [null, Validators.compose(
            [Validators.required]
          )],
          avatar: [null]
        })
      )
    }
    for (let i = 0; i < this.listStep().length; i++) {
      const dt = this.listStep()[i].value;
      if ((dt.name == null || dt.name.trim() == '') ||
        dt.description == null || dt.name.trim() == '') {
        this.listStep()[i].patchValue({ name: '', description: '' })
        return
      }
      else {
        if (i == this.listStep().length - 1) {
          return this.listStep().push(
            this.fb.group({
              id: [0, Validators.compose(
                [Validators.required]
              )],
              name: [null, Validators.compose(
                [Validators.required]
              )],
              description: [null, Validators.compose(
                [Validators.required]
              )],
              avatar: [null]
            })
          )
        }
      }
    }

  }
  removeStep(i) {
    if (i.id != 0) {
      this.loading = true;
      this.blogService.deleteStep(i.id).subscribe(
        dt => {
          this.loading = false;
          return (this.formBlog.get('step') as FormArray).removeAt(i)
        },
        err => {
          this.loading = false;
          return false
        }
      )
    }
    else {
      return (this.formBlog.get('step') as FormArray).removeAt(i)
    }

  }

  listMetarial = () => {
    return (this.formBlog.get('metarial') as FormArray).controls;
  }
  addMetarial() {
    if (this.listMetarial().length == 0) {
      return this.listMetarial().push(
        this.fb.group({
          id: [0, Validators.compose(
            [Validators.required]
          )],
          name: [null, Validators.compose(
            [Validators.required]
          )],
          content: [null],
          unit: [null]
        })
      )
    }
    for (let i = 0; i < this.listMetarial().length; i++) {
      const dt = this.listMetarial()[i].value;
      if (dt.name == null || dt.name.trim() == '') {
        this.listMetarial()[i].patchValue({ name: '' })
        return
      }
      else {
        if (i == this.listMetarial().length - 1) {
          return this.listMetarial().push(
            this.fb.group({
              id: [0, Validators.compose(
                [Validators.required]
              )],
              name: [null, Validators.compose(
                [Validators.required]
              )],
              content: [null],
              unit: [null]
            })
          )
        }
      }
    }
  }
  removeMetarial(i) {
    if (i.id != 0) {
      this.loading = true;
      this.blogService.deleteMetarial(i.id).subscribe(
        dt => {
          this.loading = false;
          return (this.formBlog.get('metarial') as FormArray).removeAt(i)
        },
        err => {
          this.loading = false;
          return false
        }
      )
    }
    else {
      return (this.formBlog.get('metarial') as FormArray).removeAt(i)
    }
  }

  listContent = () => {
    return (this.formBlog.get('content') as FormArray).controls;
  }
  addContent() {
    if (this.listContent().length == 0) {
      return this.listContent().push(
        this.fb.group({
          id: [0, Validators.compose(
            [Validators.required]
          )],
          title: [null, Validators.compose(
            [Validators.required]
          )],
          avatar: [null],
          avatar_cover: [null],
          description: [null]
        })
      );
    }
    for (let i = 0; i < this.listContent().length; i++) {
      const dt = this.listContent()[i].value;
      if (dt.title == null || dt.title.trim() == '') {
        this.listContent()[i].patchValue({ title: '' })
        return
      }
      else {
        if (i == this.listContent().length - 1) {
          return this.listContent().push(
            this.fb.group({
              id: [0, Validators.compose(
                [Validators.required]
              )],
              title: [null, Validators.compose(
                [Validators.required]
              )],
              avatar: [null],
              avatar_cover: [null],
              description: [null]
            })
          )
        }
      }
    }

  }
  removeContent(i) {
    if (i.id != 0) {
      this.loading = true;
      this.blogService.deleteStep(i.id).subscribe(
        dt => {
          this.loading = false;
          return (this.formBlog.get('content') as FormArray).removeAt(i)
        },
        err => {
          this.loading = false;
          return false
        }
      )
    }
    else {
      return (this.formBlog.get('content') as FormArray).removeAt(i)
    }

  }
  equals(objOne, objTwo) {
    if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined') {
      return objOne.id === objTwo.id;
    }
  }
  // array is selectedHastags
  selectAll(select: MatSelect, values, array) {
    select.value = values;
    array = values;
  }

  deselectAll(select: MatSelect) {
    this.selectedHastags = [];
    select.value = [];
  }

  // Logic Image
  permitFile;
  indexOflist_img_feature = 0;
  isListStep = 0;
  isAvatarCover = false;
  updateFile(event, type) {
    let fileList: FileList = event.target.files;
    const file: File = fileList[0];
    this.permitFile = file;
    this.handleAvatarBlog(file, type); //turn into base64
  }

  handleAvatarBlog(files, type) {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    if (type) {
      reader.onloadend = this.setValueAvatar.bind(this);
    }
    else {
      reader.onloadend = this.setValueAvatarCover.bind(this);
    }
    reader.readAsDataURL(file);
  }

  updateListFile(event, index, type, isAvatarCover?) {
    let fileList: FileList = event.target.files;
    const file: File = fileList[0];
    this.permitFile = file;
    this.isListStep = type;
    this.isAvatarCover = isAvatarCover;
    this.handleInputChange(file, index); //turn into base64
  }
  handleInputChange(files, index) {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    this.indexOflist_img_feature = index;

    reader.onloadend = this.setImgListAvatar.bind(this);
    reader.readAsDataURL(file);
  }
  setImgListAvatar(e) {
    let reader = e.target;
    let data = '' + reader.result.substr(reader.result.indexOf(',') + 1);
    if (this.isListStep) { // is step
      this.listStep()[this.indexOflist_img_feature].patchValue({ avatar: data })
    }
    else { // is content
      if (this.listContent()[this.indexOflist_img_feature].get('avatar').value == '' ||
        this.listContent()[this.indexOflist_img_feature].get('avatar').value == null) {
        this.listContent()[this.indexOflist_img_feature].patchValue({ avatar: data })
      }
      else {
        this.listContent()[this.indexOflist_img_feature].patchValue({ avatar_cover: data })
      }
    }
  }
  setValueAvatar(e) {
    let reader = e.target;
    this.avatar = '' + reader.result.substr(reader.result.indexOf(',') + 1);
  }
  setValueAvatarCover(e) {
    let reader = e.target;
    this.avatar_cover = '' + reader.result.substr(reader.result.indexOf(',') + 1);
  }

  createMetarial() {
    this.listMetarial().forEach(e => {
      let value = e.value;
      let data = {
        "id": value.id,
        "title": value.name,
        "unit": value.unit,
        "mass": value.content,
        "order": 0,
        "blog_id": this.blogId
      }

      if (value.id != 0) {
        this.updatMetarial(data)
      }
      else {
        this.blogService.createMetarial(data).subscribe(
          dt => {
            // this.loading = false;
            console.log(dt)
          },
          err => {
            // this.loading = false;
          }
        )
      }
    })
  }

  createStep() {
    this.listStep().forEach(e => {
      let value = e.value;
      let data = {
        "id": value.id,
        "name": value.name,
        "description": value.description,
        "banner_img": value.avatar,
        "order": 0,
        "blog_id": this.blogId
      }
      if (value.id != 0) {
        this.updateStep(data)
      }
      else {
        this.blogService.createStep(data).subscribe(
          dt => {
            console.log(dt)
          },
          err => {
          }
        )
      }
    })
  }

  createContent() {
    this.listContent().forEach(e => {
      let value = e.value;
      let data = {
        "id": value.id,
        "name": value.title,
        "content": value.description,
        "banner_img": value.avatar,
        "banner_cover": value.avatar_cover,
        "blog_id": this.blogId
      }
      if (value.id != 0) {
        this.updateContent(data)
      }
      else {
        this.blogService.createContent(data).subscribe(
          dt => {
            console.log(dt)
          },
          err => {
          }
        )
      }

    })
  }


  updatMetarial(data) {
    this.blogService.updateMetarial(data).subscribe(
      dt => {
        console.log(dt)
      },
      err => {
      }
    )
  }
  updateContent(data) {
    this.blogService.updateContent(data).subscribe(
      dt => {
        console.log(dt)
      },
      err => {
      }
    )
  }
  updateStep(data) {
    this.blogService.updateStep(data).subscribe(
      dt => {
        // this.loading = false;

      },
      err => {
      }
    )
  }

  // End Logic Image
}
