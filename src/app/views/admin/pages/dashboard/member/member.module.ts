import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberComponent } from './member.component';
import { RouterModule, Routes } from '@angular/router';
import { LoadModule } from 'src/app/core/component/load/load.module';

const routers: Routes = [
  {
    path: '',
    component: MemberComponent
  }
]
@NgModule({
  declarations: [MemberComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routers),
    LoadModule
  ],
  exports: [RouterModule]
})
export class MemberModule { }
