import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashBoardService } from 'src/app/core/_service/admin/dashBoard.service';
import { BlogService } from 'src/app/core/_service/blog/blog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListBlogComponent implements OnInit {
  loading = true;
  constructor(
    private blogService: BlogService,
    private route: Router,
    private dashBoardService: DashBoardService
  ) { }

  listBlog = [];
  ngOnInit(): void {
    this.blogService.getAllBlogeres().subscribe(
      dt => {
        this.listBlog = dt.Data.Items;
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    )
  }

  routerUpdate(id) {
    this.route.navigateByUrl("/" + this.route.url.split('/')[1] + "/" + "/update", { state: id })
  }

  routerCreateBlog() {
    this.route.navigateByUrl("/" + this.route.url.split('/')[1] + "/create")
  }

  activeBlog(val, status) {
    this.loading = true;
    let data = {
      id: val.id,
      status: status.checked ? 1 : 0
    }
    this.blogService.activeBlog(data).subscribe(
      dt => {
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    )
  }

  deleteProduct(id, index) {
    if (confirm("Delete ok?")) {
      this.blogService.delete(id).subscribe(
        dt => {
          this.listBlog.splice(index, 1)
        },
        err => {
          this.loading = false;
        }
      )
    }
  }

  timeSelect = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
  newDate = this.timeSelect;
  getOrderBlogByMonth(type) {
    let date = this.timeSelect;
    switch (type) {
      case 1:
        // start = "01";
        // end = "03"
        break;
      case 2:
        // start = "04";
        // end = "06"
        break;
      case 3:
        // start = "07";
        // end = "09"
        break;
      case 4:
        // start = "10";
        // end = "12"
        break;
      default:
        break;
    }
    this.loading = true;
    this.dashBoardService.GetTopBlogByDay(date).subscribe(
      dt => {
        this.loading = false;
        console.log(dt)
      }
    )
  }

  reset() {
    this.loading = true;
    Promise.all(
      [
        // this.getAllOrder()
      ]
    ).then(
      (dt: any) => {
        this.listBlog = dt[0].Data?.Items;
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    )
  }
}

