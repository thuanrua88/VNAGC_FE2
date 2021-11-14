import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddToCartService } from 'src/app/core/_service/addToCart/add-to-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  listCart = [];
  constructor(
    private addToCartService: AddToCartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addToCartService.cartCurrent.subscribe(
      () => {
        this.listCart = JSON.parse(sessionStorage.getItem("cart")) ? JSON.parse(sessionStorage.getItem("cart")) : [];
        this.listCart.forEach(e => {
          e.totalAProduct = e.price * ((100 - e.sale) / 100);
          e.subtotal = e.totalAProduct * e.quantity;
        });
      }
    );
    
  }

  setQuantity(index, quantity) { 
    this.listCart[index].subtotal = this.listCart[index].totalAProduct * quantity;
    this.listCart[index].quantity = quantity;
    this.addToCartService.setCart(this.listCart[index]);
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

  createCart() {
    this.listCart.forEach((e, index) => {
      let data = {
        "product_id": e.id,
        "quantity": e.quantity
      }
      this.addToCartService.createCart(data).subscribe(
        dt => {
          console.log(dt);
          if (index == this.listCart.length -1) {
            this.router.navigate(["checkout"])
          }
        }
      )
    })
  }
}
