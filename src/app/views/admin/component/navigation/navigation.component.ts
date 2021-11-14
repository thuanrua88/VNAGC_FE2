import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isCollapsed = {
    metarial: false,
    step: false,
    content: false,
    order: false,
    category: false
  };
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

}
