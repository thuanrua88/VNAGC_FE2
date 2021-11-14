import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BaseComponent } from './base/base.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    FooterComponent, HeaderComponent, BaseComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    MatMenuModule
    ]
})
export class ThemesModule { }
