import { Component, OnInit } from '@angular/core';
import { AddToCartService } from 'src/app/core/_service/addToCart/add-to-cart.service';
import { OrderService } from 'src/app/core/_service/profile/order.service';

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.css']
})
export class OrderManagerComponent implements OnInit {
  listOrder: any = [];
  load = true;
  constructor(
    private orderService: OrderService,
    private addToCart: AddToCartService
  ) { }

  ngOnInit(): void {
    Promise.all(
      [
        this.getOrders()
      ]
    ).then(
      (dt: any) => {
        this.listOrder = dt[0].Data;
        this.load = false;
        console.log(dt[0].Data)
        // this.listOrder.forEach((e,index) => {
        //   this.orderService.getOrderDetail(e.id).subscribe(
        //     dt => {
        //       this.listOrder[index].products = dt.Data;
        //       if (index == this.listOrder.length - 1) {
        //         this.load = false;
        //       }
        //     }
        //   )

        // });
      },
      err => {
        this.load = false;
      }
    )
  }

  getOrders(): Promise<any> {
    return new Promise(async (resolve) => {
      const dt = await this.orderService.getOrders().toPromise();
      resolve(dt);
    });
  }
  OrderDetail = [];
  getOrderDetail(id) {
    this.OrderDetail = this.listOrder[id].items;
  }
}
