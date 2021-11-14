import { Injectable } from "@angular/core";
import { HelperService } from "src/app/_helpers/helper.service";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private helperService: HelperService) { }
 
    getOrders() {
        return this.helperService.getAll("Order/get-order-history?pageIndex=1&pageSize=1000");
    }

    getOrderDetail(order_id) {
        return this.helperService.getAll("Cart/get-cart-detail/" + order_id);
    }

    getCards() {
        return this.helperService.getAll("Cart/get-cart");
    }

    getAllOrder() {
        return this.helperService.getAll("Order/get-all-order?pageIndex=1&pageSize=1000");
    }
}