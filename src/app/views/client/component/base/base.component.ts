import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  checkAuthen = true;

  constructor(
    private activatedRoute: Router
  ) {
    activatedRoute.events
      .pipe(filter(e => e instanceof RouterEvent))
      .subscribe(e => {
        if (activatedRoute.url == '/login' ||
          activatedRoute.url == '/register') {
          this.checkAuthen = false
        }
        else {
          this.checkAuthen = true
        }
      });

  }
  ngOnInit(): void {

  }

}
