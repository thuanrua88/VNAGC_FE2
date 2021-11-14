import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseDashboardComponent } from './base/base.component';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: '', component: BaseDashboardComponent },
      { path: 'product', loadChildren: () => import('./product/base-product.module').then(m => m.baseProductModule) },
      { path: 'blog', loadChildren: () => import('./blog/base-blog.module').then(m => m.baseBlogModule) },
      { path: 'order', loadChildren: () => import('./order-manager/order-manager.module').then(m => m.OrderManagerModule) },
      { path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
      { path: 'member', loadChildren: () => import('./member/member.module').then(m => m.MemberModule) },
      { path: 'page-profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
