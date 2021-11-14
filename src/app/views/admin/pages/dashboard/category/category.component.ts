import { Component, OnInit, TemplateRef } from '@angular/core';
import { CategoryService } from 'src/app/core/_service/category/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

export interface PeriodicElement {
  name: string;
  position: number;
  countBlog: number;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  listCategory = [
  ];

  urlImg = this.categoryService.urlImg;
  displayedColumns: string[] = ['id', 'name', 'countBlog', 'createdDate', 'action'];
  dataSource = new MatTableDataSource(this.listCategory);

  load = true;
  modalRef?: BsModalRef;
  newCategory = '';
  editNameCategory = '';
  Category_delete = {
    id: 0,
    index: 0
  }
  editId = 0;
  avatar;
  constructor(
    private categoryService: CategoryService,
    private modalService: BsModalService,
  ) {
  }

  ngOnInit(): void {
    Promise.all(
      [
        this.getCategory()
      ]
    ).then(
      (dt: any) => {
        this.listCategory = dt[0].Data;
        this.listCategory.forEach((e, i) => {
          this.listCategory[i].index = i;
        });
        this.load = false;
      },
      err => {
        this.load = false;
      }
    )
  }
  isEdit = false;
  editCategory(item) {
    this.isEdit = true;
    this.editId = item.id;
    this.editNameCategory = item.name
  }

  getCategory(): Promise<any> {
    return new Promise(async (resolve) => {
      const dt = await this.categoryService.getCategorys().toPromise();
      resolve(dt);
    });
  }

  addNewCategory() {
    let aname = this.newCategory;

    if (aname.trim() == '') {
      return
    }
    let nowDate = new Date();
    let data = {
      "name": aname,
      "createdDate": nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate(),
      "avatar": this.avatar
    }
    this.load = true;
    this.categoryService.createCategory(data).subscribe(
      dt => {
        // window.location.reload();
      },
      err => {
        this.load = false;
      }
    )
  }

  saveEditCategory(index) {
    if (this.editNameCategory.trim() == '') {
      return
    }
    let nowDate = new Date();
    let data = {
      "id": this.listCategory[index].id,
      "name": this.editNameCategory,
      "createdDate": nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate(),
      "avatar": this.listCategory[index].avatar
    }
    this.load = true;
    this.newCategory = '';
    this.categoryService.updateCategory(data).subscribe(
      dt => {
        this.load = false;
        this.editId = 0; this.isEdit = false;
        this.listCategory[index].name = this.editNameCategory;
        this.dataSource = new MatTableDataSource(this.listCategory)
      },
      err => {
        this.load = false;
      }
    )
  }

  deleteCategory() {
    this.load = true;
    this.categoryService.deleteCategory(this.Category_delete.id).subscribe(
      dt => {
        if (dt.Data) {
          this.listCategory.splice(this.Category_delete.index, 1);
          this.listCategory.forEach((e, i) => {
            this.listCategory[i].index = i;
          });
          this.dataSource = new MatTableDataSource(this.listCategory);
          this.closeModal();
        }
        else {
          this.load = false;
        }
      },
      err => {
        this.load = false;
        console.log(err)
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

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
    reader.onloadend = this.setValueAvatar.bind(this);

    reader.readAsDataURL(file);
  }
  setValueAvatar(e) {
    let reader = e.target;
    this.avatar = '' + reader.result.substr(reader.result.indexOf(',') + 1);
  }

  imgEdit;
  imgEditIndex = 0;
  updateFileEdit(event, index) {
    let fileList: FileList = event.target.files;
    const file: File = fileList[0];
    this.permitFile = file;
    this.handleAvatarBlogEdit(file, index); //turn into base64
  }
  handleAvatarBlogEdit(files, index) {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this.setValueAvatarEdit.bind(this);

    reader.readAsDataURL(file);
  }
  setValueAvatarEdit(e) {
    let reader = e.target;
    this.listCategory[this.imgEditIndex].avatar = '' + reader.result.substr(reader.result.indexOf(',') + 1);
  }
  openModal(template: TemplateRef<any>, element) {
    this.Category_delete.id = element.id;
    this.Category_delete.index = element.index;

    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalService.hide();
    this.load = false;
  }
}
