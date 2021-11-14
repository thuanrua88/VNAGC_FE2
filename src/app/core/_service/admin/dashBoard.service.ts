import { Injectable } from "@angular/core";
import { HelperService } from "src/app/_helpers/helper.service";

@Injectable({
    providedIn: "root"
})

export class DashBoardService {
    constructor(private helperService: HelperService) {}
    controll = 'Dashboard/';
 
    getStatistics() { 
        return this.helperService.getAll(this.controll + 'get-DashBoard');
    }

    getAllMember() {
        let param = '?pageIndex=1&pageSize=1000';

        return this.helperService.getParam(this.controll + 'get-all-user', param);
    }

    getAllOrder() {
        let param = '?pageIndex=1&pageSize=1000';
        return this.helperService.getParam("Dashboard/get-all-order", param);
    }

    getProductTopRating() {
        return this.helperService.getAll("Products/get-product-top-rating");
    }

    getProductPopular() {
        return this.helperService.getAll("Products/get-product-popular");
    }
    

    getTopBlog() {
        return this.helperService.getAll("Dashboard/get-Top-Blog");
    }

    getBlogByMonth(start, end) {
        let param = `?start=${start}&end=${end}`;
        return this.helperService.getAll("Dashboard/get-Top-Blog-by-month" + param);
    }

    getBlogByYear() {
        return this.helperService.getAll("Dashboard/get-Top-Blog-by-year");
    }

    getAllOrderDetail(id) {
        return this.helperService.get("get-order-detail",  id);
    }

    getOrderByMonth(start, end) {
        let param = `?start=${start}&end=${end}`;
        return this.helperService.getAll("Dashboard/get-Top-Order-by-month" + param);
    }

    getOrderByYear() {
        return this.helperService.getAll("Dashboard/get-Top-Order-by-year");
    }

    GetTopOrderByDay(date) {
        return this.helperService.get("Dashboard/get-All-Order-by-day", date);
    }

    GetCountBlogByDay(date) {
        return this.helperService.get("Dashboard/get-count-Blog-by-day", date);
    }

    GetTopBlogByDay(date) {
        return this.helperService.get("Dashboard/get-count-Blog-by-day", date);
    }
}