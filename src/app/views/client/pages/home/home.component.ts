import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/_service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      dt => {
        console.log("list product: " + dt)
      },
      err => {
        console.log(err)
      }
    )
  }

}
