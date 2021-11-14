import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './blogs/blogs.component';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { LoadModule } from 'src/app/core/component/load/load.module';

const router: Routes = [
  {
    path: '',
    component: BlogsComponent
  },
  {
    path: 'blog-detail',
    component: BlogDetailComponent
  },
]

@NgModule({
  declarations: [BlogsComponent, BlogDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    LoadModule
  ]
})
export class BlogsModule { }
