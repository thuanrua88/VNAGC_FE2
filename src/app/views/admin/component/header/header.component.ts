import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/models/user';
import { AuthenService } from 'src/app/core/_service/authen/authen.service';
import { CategoryService } from 'src/app/core/_service/category/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profile: user;
  urlImg = this.categoryService.urlImg
  constructor(private authenSv: AuthenService,
    private categoryService: CategoryService,) { }

  ngOnInit(): void {
    this.profile = JSON.parse(sessionStorage.getItem("user") ? sessionStorage.getItem("user") : sessionStorage.getItem("user"));
  }
  logout() {
    this.authenSv.logout()
  }
}
