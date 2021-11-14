import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/core/_service/blog/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  listBlog:any=[];
  loading=true;
  constructor(
    private blogService: BlogService,
  ) { }

  ngOnInit(): void {
    Promise.all([this.GetBlogsActive()]).then(
      dt => {
        this.loading=false;
        this.listBlog = dt[0]
      }
    )
  }

  GetBlogsActive():Promise<any> {
    return new Promise((resolve)=> {
      const dt = this.blogService.GetBlogsActive().toPromise();
      return resolve(dt)
    })
  }
}
