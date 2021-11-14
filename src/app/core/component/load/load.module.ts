import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadComponent } from './load.component';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
  declarations: [LoadComponent],
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({})
  ],
  exports: [
    LoadComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class LoadModule { }
