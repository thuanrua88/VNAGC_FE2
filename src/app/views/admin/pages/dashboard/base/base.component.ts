import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { DashBoardService } from 'src/app/core/_service/admin/dashBoard.service';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseDashboardComponent implements OnInit {
  canvas: any;
  ctx: any;
  load = true;

  // Bar
  chartOptions = {
    responsive: true,
  };
  chartLabels = [];
  chartLegend = true;

  chartData = [
    { data: [0, 10, 20], label: 'Count Orders' }
  ];

  chartOptions_blog = {
    responsive: true,
  };
  chartLabels_blog = [];
  chartLegend_blog = true;
  chartColors_blog = [{
    backgroundColor: ['#e5e5e5', '#e5e5e5', '#e5e5e5'],
  }];
  chartData_blog = [
    { data: [0, 10, 20], label: 'Count Blogs' }
  ];

  Statistics = {
    "countProduct": 0,
    "countBlog": 0,
    "countBlogActive": 0,
    "coutAccout": 0,
    "coutOrder": 0,
    "countTotal": 0
  };

  listProductRating;
  listProductPopular;
  profile: user;
  listTopBlogView;
  datagetTopOrderByYear = [];
  datagetTopBlogByYear = []

  orderInDay;
  blogInDay;
  timeSelect = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
  nowDate = this.timeSelect;
  constructor(
    private dashBoardService: DashBoardService,
  ) {
   }

  ngOnInit(): void {
    Promise.all([
      this.getStatistics(),
      this.getProductTopRating(),
      this.getProductPopular(),
      this.getTopBlog(),
      this.getTopBlogByYear(),
      this.getTopOrderByYear(),
      this.GetTopOrderByDay(),
      this.GetCountBlogByDay()
    ]).then(dt => {
      this.profile = JSON.parse(sessionStorage.getItem("user") ? sessionStorage.getItem("user") : sessionStorage.getItem("user"));

      this.Statistics = dt[0].Data;
      this.listProductRating = dt[1].Data;
      this.listProductPopular = dt[2].Data;
      this.listTopBlogView = dt[3];
      this.setDataOrderByYear(dt[5])

      this.setDataBlogByYear(dt[4]);
      this.orderInDay = dt[6];
      this.blogInDay = dt[7];
      this.load = false;
    })
  }

  GetTopOrderByDay() {
    this.dashBoardService.GetTopOrderByDay(this.timeSelect).subscribe(
      dt => {
        this.orderInDay = dt[0];
      }
    )
  }

  fGetTopOrderByDay(value) {
    this.timeSelect = value;
    this.dashBoardService.GetTopOrderByDay(value).subscribe(
      dt => {
        this.orderInDay = dt[0];
      }
    )
  }

  fGetTopBlogByDay(date) {
    this.timeSelect = date;
    this.dashBoardService.GetTopBlogByDay(date).subscribe(
      dt => {
        this.blogInDay = dt[0];
      })
  }

  GetCountBlogByDay() {
    return new Promise(async (resolve) => {
      let d = await this.dashBoardService.GetTopBlogByDay(this.timeSelect).toPromise();
      resolve(d)
    })
  }

  setDataOrderByYear(data) {
    let getTopOrderByYear = data;
    for (let index = 0; index < 12; index++) {
      let x = index;
      ++x;
      this.chartLabels.push(x);
      let e = getTopOrderByYear[index];
      this.datagetTopOrderByYear.push(e[x]);
    }
    this.chartData[0].data = this.datagetTopOrderByYear;

  }

  setDataBlogByYear(data) {
    let getTopBlogByYear = data;
    for (let index = 0; index < 12; index++) {
      let x = index;
      ++x;
      this.chartLabels_blog.push(x);
      let e = getTopBlogByYear[index];
      this.datagetTopBlogByYear.push(e[x]);
    }
    this.chartData_blog[0].data = this.datagetTopBlogByYear;

  }
  getProductTopRating(): Promise<any> {
    return new Promise(async (resolve) => {
      let d = await this.dashBoardService.getProductTopRating().toPromise();
      resolve(d)
    })
  }

  getStatistics(): Promise<any> {
    return new Promise(async (resolve) => {
      let d = await this.dashBoardService.getStatistics().toPromise();
      resolve(d)
    })
  }

  getProductPopular(): Promise<any> {
    return new Promise(async (resolve) => {
      let d = await this.dashBoardService.getProductPopular().toPromise();
      resolve(d)
    })
  }

  getTopBlog() {
    return new Promise(async (resolve) => {
      let d = await this.dashBoardService.getTopBlog().toPromise();
      resolve(d)
    })
  }

  getTopBlogByMonth() {
    let start = 1;
    let end = 12;
    this.dashBoardService.getBlogByMonth(start, end).subscribe(
      dt => {
        console.log(dt)
      }
    )
  }

  getTopBlogByYear() {
    return new Promise(async (resolve) => {
      let d = await this.dashBoardService.getBlogByYear().toPromise();
      resolve(d)
    })
  }
  getTopOrderByYear() {
    return new Promise(async (resolve) => {
      let d = await this.dashBoardService.getOrderByYear().toPromise();
      resolve(d)
    })
  }


}
