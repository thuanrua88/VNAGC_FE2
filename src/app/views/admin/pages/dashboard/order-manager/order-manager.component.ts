import { Component, OnInit } from '@angular/core';
import { AddToCartService } from 'src/app/core/_service/addToCart/add-to-cart.service';
import { DashBoardService } from 'src/app/core/_service/admin/dashBoard.service';
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
    private dashBoardService: DashBoardService,
  ) { }

  ngOnInit(): void {
    Promise.all(
      [
        this.getAllOrder()
      ]
    ).then(
      (dt: any) => {
        this.listOrder = dt[0].Data?.Items;
        this.load = false;
      },
      err => {
        this.load = false;
      }
    )
  }

  getAllOrder(): Promise<any> {
    return new Promise(async (resolve) => {
      const dt = await this.dashBoardService.getAllOrder().toPromise();
      resolve(dt);
    });
  }

  reset() {
    Promise.all(
      [
        this.getAllOrder()
      ]
    ).then(
      (dt: any) => {
        this.listOrder = dt[0].Data?.Items;
        this.load = false;
      },
      err => {
        this.load = false;
      }
    )
  }
  OrderDetail = [];
  getOrderDetail(id) {
    this.OrderDetail = this.listOrder[id].items;
  }

  getOrderBlogByMonth(type) {
    let start = "01";
    let end = "12";
    switch (type) {
      case 1:
        start = "01";
        end = "03"
        break;
      case 2:
        start = "04";
        end = "06"
        break;
      case 3:
        start = "07";
        end = "09"
        break;
      case 4:
        start = "10";
        end = "12"
        break;
      default:
        break;
    }
    this.load = true;
    this.dashBoardService.getOrderByMonth(start, end).subscribe(
      dt => {
        this.load = false;
        this.OrderDetail = [];
        this.listOrder = dt;
      }
    )
  }
}
