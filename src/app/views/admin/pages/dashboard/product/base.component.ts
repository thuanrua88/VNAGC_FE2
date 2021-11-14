import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  template: `
  <router-outlet></router-outlet>
  `
})
export class BaseProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
