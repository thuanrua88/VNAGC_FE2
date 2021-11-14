import { Component, OnInit } from '@angular/core';
import { AddToCartService } from 'src/app/core/_service/addToCart/add-to-cart.service';
import { ProductService } from 'src/app/core/_service/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  listProduct: any = [];
  load = true;
  constructor(
    private productService: ProductService,
    private addToCart: AddToCartService
  ) { }

  ngOnInit(): void {
    Promise.all(
      [
        this.getProduct()
      ]
    ).then(
      (dt: any) => {
        this.listProduct = dt[0].Data;

        this.load = false;
      },
      err => {
        this.load = false;
      }
    )
  }

  getProduct(): Promise<any> {
    return new Promise(async (resolve) => {
      const dt = await this.productService.getAllProducts().toPromise();
      resolve(dt);
    });
  }

  addtoCart(product) {
    product.quantity = 1;
    this.addToCart.setCart(
      product
    );
  }
}
