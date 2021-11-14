import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrPageComponent } from './err-page.component';
import { RouterModule, Routes } from '@angular/router';

const router: Routes= [
  {
    path: '',
    component: ErrPageComponent
  }
]
@NgModule({
  declarations: [ErrPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(router)
  ]
})
export class ErrPageModule { }
