import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { RouterModule, Routes } from '@angular/router';
import { LoadModule } from 'src/app/core/component/load/load.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { HashtagComponent } from './hashtag/hashtag.component';

const routers: Routes = [
  {
    path: '', component: CategoryComponent
    
  }
]

@NgModule({
  declarations: [CategoryComponent, HashtagComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routers),
    FormsModule,
    LoadModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    ModalModule.forRoot()

  ],
  exports: [RouterModule]
})
export class CategoryModule { }
