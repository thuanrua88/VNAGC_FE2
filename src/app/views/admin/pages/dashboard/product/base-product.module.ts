import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { BaseProductComponent } from './base.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadModule } from 'src/app/core/component/load/load.module';

import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';

import { ProductCreateComponent } from './create/product-create.component';
import { UpdateProductComponent } from './update/update.component';

const routes: Routes = [
    {
        path: '', component: BaseProductComponent,
        children: [
            { path: '', component: ListProductComponent },
            { path: 'list', component: ListProductComponent },
            {
                path: 'create',
                component: ProductCreateComponent
            },
            {
                path: 'update',
                component: UpdateProductComponent
            }
        ]
    },
];
@NgModule({
    declarations: [
        ListProductComponent,
        BaseProductComponent,
        ProductCreateComponent,
        UpdateProductComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        LoadModule,

        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatStepperModule,
    ],
    exports: [RouterModule]
})
export class baseProductModule { }
