import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';
import { LoadModule } from 'src/app/core/component/load/load.module';
import { OrderManagerComponent } from './order-manager/order-manager.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileControllComponent } from './profile-controll/profile-controll.component';
import { baseBlogModule } from 'src/app/views/admin/pages/dashboard/blog/base-blog.module';
import { CreateBlogComponent } from 'src/app/views/admin/pages/dashboard/blog/create/create.component';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: '', component: ProfileComponent,
    children: [
      {
        path: '', component: ProfileDetailComponent
      },
      {
        path: 'detail', component: ProfileDetailComponent
      },
      {
        path: 'edit', component: ProfileControllComponent
      },
      {
        path: 'order-manager', component: OrderManagerComponent
      },
      {
        path: 'create-blog', component: CreateBlogComponent
      
      }
    ]
  }
]

@NgModule({
  declarations: [ProfileComponent, OrderManagerComponent, ProfileDetailComponent, ProfileControllComponent],
  imports: [
    CommonModule,
    LoadModule,
    MatButtonModule, 
    RouterModule.forChild(routes),
  ]
})
export class ProfileModule { }
