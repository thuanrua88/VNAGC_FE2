import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import KeenSlider from "keen-slider"
import { ProductService } from 'src/app/core/_service/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { product } from 'src/app/models/product';
import { AddToCartService } from 'src/app/core/_service/addToCart/add-to-cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css', '../../../../../../node_modules/keen-slider/keen-slider.min.css']
})
export class ProductDetailComponent implements OnInit {
  load = true;
  thumbsSwiper: any;
  slider;
  avatar
  avatar_cover;
  listAvatar_feature;
  quantity=0;
  customOptions: OwlOptions = {
    margin: 25,
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 600,
    items: 4,
    navText: ['&#8249', '&#8250;'],
    autoplay: false,
    autoplayTimeout: 5000,
    autoWidth: true,
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      769: {
        items: 3
      },
      993: {
        items: 3
      },
      1025: {
        items: 4
      }
    },
    nav: true
  }
  
  product: product;
  avatarSelect;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private addToCart: AddToCartService
  ) { }
 
  listProduct;
  ngOnInit(): void {
    Promise.all(
      [
        this.getProduct(),
        this.getProductImgFeature()
      ]
    ).then(
      dt => {
        this.load = false;
        console.log(dt)
        let data = dt[0].Data;
        this.product = data;
        this.avatar = data.banner_img;
        this.avatar_cover = data.cover_img;
        this.listAvatar_feature = dt[1];
        this.avatarSelect = data.banner_img
      }
    )
  }
  getProduct(): Promise<any> {
    return new Promise(async (resolve) => {
      const dt = await this.productService.getProduct(this.activatedRoute.snapshot.paramMap.get('id')).toPromise();
      resolve(dt);
    });
  }
  getProductImgFeature(): Promise<any> {
    return new Promise(async (resolve) => {
      const dt = await this.productService.GetImgProductFeature(this.activatedRoute.snapshot.paramMap.get('id')).toPromise();
      resolve(dt);
    });
  }

  addtoCart() {
    this.product.quantity = this.quantity;
    this.addToCart.setCart(
      this.product
    );
  }
}
