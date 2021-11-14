import { Component, OnInit } from '@angular/core';
import { DashBoardService } from 'src/app/core/_service/admin/dashBoard.service';
import { AuthenService } from 'src/app/core/_service/authen/authen.service';
import { CategoryService } from 'src/app/core/_service/category/category.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  listMember = [];
  urlImg = this.categoryService.urlImg;

  load = true;
  active = 0;
  constructor(
    private categoryService: CategoryService,
    private admin: DashBoardService,
    private authenservice: AuthenService
  ) { }
  ngOnInit(): void {

    Promise.all(
      [this.getAllMember()]
    ).then(
      (dt) => {
        this.listMember = dt[0].Data.Items;
        this.listMember.forEach(
          e => e.avatar ? e.avatar = this.urlImg + e.avatar : e.avatar = 'assets/images/avatars/default-avatar.jpg'
        )
        this.load = false;
        console.log(this.listMember)
      }
    )
  }

  getAllMember(): Promise<any> {
    return new Promise(
      async (resolve) => {
        let dt = await this.admin.getAllMember().toPromise();
        return resolve(dt)
      }
    )
  }

}
