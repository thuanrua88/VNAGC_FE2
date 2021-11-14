import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterComponent } from './toaster.component';
// import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ToasterComponent],
  imports: [
    CommonModule,
    // ToastModule
  ]
})
export class ToasteModule { }
