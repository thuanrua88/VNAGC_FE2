import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  template: `
  <div class="app-content content">
  <router-outlet></router-outlet>
  </div>
  `
})
export class BlogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
