import { Component, OnInit } from '@angular/core';
import { AddToCartService } from 'src/app/core/_service/addToCart/add-to-cart.service';
import { AuthenService } from 'src/app/core/_service/authen/authen.service';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin=false;
  user: user;
  countProduct=0;
  listCart=[];
  constructor(
    private authenSv: AuthenService,
    private addToCartService: AddToCartService
  ) { }

  ngOnInit(): void {
    this.authenSv.currentUserSubject.subscribe(
      dt => {
        if (dt) {
          this.isLogin = true;
          this.user = JSON.parse(sessionStorage.getItem("user"));
        }
        else {
          this.isLogin = false;
        }
      }
    )
    this.addToCartService.cartCurrent.subscribe(
      () => {
        this.countProduct = JSON.parse(sessionStorage.getItem("cart")) ? JSON.parse(sessionStorage.getItem("cart")).length : 0;
        this.listCart = JSON.parse(sessionStorage.getItem("cart")) ? JSON.parse(sessionStorage.getItem("cart")) : [];
        this.listCart.forEach(e => {
          e.totalAProduct = e.price * ((100 - e.sale) / 100);
          e.subtotal = e.totalAProduct * e.quantity;
        });
      }
    );
  }

  logout() {
    this.authenSv.logout()
  }

  updatetoCart(product, quantity) {
    if(quantity==0) {
      quantity=1;
    }
    product.quantity = quantity;
    this.addToCartService.setCart(
      product
    );
  }
  
  deleteCartByIdProduct(id, i) {
    this.listCart.splice(i, 1)
    this.addToCartService.deleteCartByIdProduct(id)
  }

  total() {
    let total = 0;
    this.listCart.forEach(e => {
      total = e.subtotal + total;
    });
    return total
  }
}
