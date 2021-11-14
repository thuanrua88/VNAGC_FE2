import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HashtagService } from 'src/app/core/_service/hashtag/hashtag.service';

export interface PeriodicElement {
  name: string;
  position: number;
  countBlog: number;
}
@Component({
  selector: 'app-hashtag',
  templateUrl: './hashtag.component.html',
  styleUrls: ['./hashtag.component.css']
})

export class HashtagComponent implements OnInit {
  listCategory = [
  ];

  displayedColumns: string[] = ['id', 'name', 'countBlog', 'createdDate', 'action'];
  dataSource = new MatTableDataSource(this.listCategory);

  load = false;
  modalRef?: BsModalRef;
  newCategory = null;
  editNameCategory = '';
  Category_delete = {
    id: 0,
    index: 0
  }
  editId = 0;
  constructor(
    private hashtagService: HashtagService,
    private modalService: BsModalService,
  ) {
  }

  ngOnInit(): void {
    Promise.all(
      [
        this.getHashtag()
      ]
    ).then(
      (dt: any) => {
        this.listCategory = dt[0].Data;
        this.listCategory.forEach((e, i) => {
          this.listCategory[i].index = i;
        });
        this.dataSource = new MatTableDataSource(this.listCategory)
        this.load = false;
      },
      err => {
        this.load = false;
      }
    )
  }
  isEdit = false;
  editCategory(id) {
    this.isEdit = true;
    this.editId = id;
    this.editNameCategory = ''
  }

  getHashtag(): Promise<any> {
    return new Promise(async (resolve) => {
      const dt = await this.hashtagService.getHashtags().toPromise();
      resolve(dt);
    });
  }

  addNewCategory() {
    let name = this.newCategory;
    this.newCategory = '';
    if (name.trim() == '') {
      return
    }
    this.load = true;
    this.hashtagService.createHashtag(name).subscribe(
      dt => {
        this.load = false;
        this.listCategory.unshift({
          id: dt.Data.id,
          name: dt.Data.name,
          countBlog: null,
          createdDate: dt.Data.createdDate,
          action: 1,
          index: 0
        });
        this.listCategory.forEach((e, i) => {
          this.listCategory[i].index = i;
        });
        this.dataSource = new MatTableDataSource(this.listCategory)
      },
      err => {
        this.load = false;
      }
    )
  }

  saveEditCategory(index) {
    this.load = true;
    let name = {
      "id": this.editId,
      "name": this.editNameCategory
    };
    this.newCategory = '';
    this.hashtagService.updateHashtag(name).subscribe(
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
    this.hashtagService.deleteHashtag(this.Category_delete.id).subscribe(
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