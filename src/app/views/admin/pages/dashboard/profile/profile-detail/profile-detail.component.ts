import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/core/_service/category/category.service';
import { ProfileService } from 'src/app/core/_service/profile/profileService..service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  urlImg = this.categoryService.urlImg;
  userId;
  listBlog;
  load = true;
  constructor(
    private categoryService: CategoryService,
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute
  ) {
    this.userId = activatedRoute.snapshot.paramMap.get("id");
   }

  ngOnInit(): void {
    Promise.all([
      this.getBlogById()
    ]).then(
      dt => {
        this.load = false
        this.listBlog = dt[0].Data.Items;
      }
    )
  }

  getBlogById():Promise<any> {
    return new Promise(async (resolve)=> {
      let dt = await this.profileService.getBlogById().toPromise();
      resolve(dt)
    })
  }
}

