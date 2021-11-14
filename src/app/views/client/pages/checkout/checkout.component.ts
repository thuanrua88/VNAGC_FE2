import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddToCartService } from 'src/app/core/_service/addToCart/add-to-cart.service';
import { PaymentService } from 'src/app/core/_service/payment/payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  listCart = [];

  constructor(
    private route: Router,
    private paymentService: PaymentService,
    private addToCartService: AddToCartService
    ) { }
  ngOnInit(): void {
    this.listCart = JSON.parse(sessionStorage.getItem('cart'));
    this.listCart.forEach(e => {
      e.totalAProduct = e.price * ((100 - e.sale) / 100);
      e.subtotal = e.totalAProduct * e.quantity;
    });

    paypal.Buttons(
      {
        style: {
          color: 'blue'
        }, createOrder: (data, actions) => {
          // This function sets up the details of the transaction, including the amount and line item details.
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: 1000
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          // This function captures the funds from the transaction.

          return actions.order.capture().then((details) => {
            // This function shows a transaction success message to your buyer.
            this.paymentService.createPayment().subscribe(
              data => {
                this.addToCartService.deleteCart()
                this.route.navigate(["/shop"])
              }
            );
            // this.userService.putUserUpgradePackageID(this.idUser, e.PackageID).subscribe(
            //   data => {
            //     alert(`Thank ${details.payer.name.given_name} for supporting the site, you have ${e.Duration} days free`);
            //     window.location.reload();
            //   }
            // );

          });
        }
        // })
      }
    ).render('#paypal-button-container');
  }
  total() {
    let total = 0;
    this.listCart.forEach(e => {
      total = e.subtotal + total;
    });
    return total
  }
}
