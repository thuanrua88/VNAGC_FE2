import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/core/_service/blog/blog.service';
import { blog } from 'src/app/models/blog';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blog: blog;
  loading=true;
  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit(): void {
    Promise.all([
      this.getBlog(),
      this.getMetarial(),
      this.getContents(),
      this.getStep()
    ]).then(
      dt => {
        console.log(dt)
        this.loading= false;
        this.blog=dt[0].Data;
        this.blog.metarial = dt[1];
        this.blog.content = dt[2];
        this.blog.step = dt[3];
        console.log(this.blog)
      }
    )
  }

  getBlog():Promise<any> {
    return new Promise(
      async (resolve)=> {
        const dt = await this.blogService.getBlog(this.activatedRoute.snapshot.paramMap.get("id")).toPromise();
        return resolve(dt)
     }) 
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
}
