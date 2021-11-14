import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { HelperService } from 'src/app/_helpers/helper.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  urlImg = AppConfig.settings.WhiteServer.replace("api/", "Uploads/Product/");
  constructor(
    private helperService: HelperService
  ) { }

  getAllProducts() {
    return this.helperService.getAll("Products/get-all-product");
  }

  getProduct(id) {
    return this.helperService.get("Products/detail", id);
  }

  create(data) {
    return this.helperService.post("Products", data);
  }

  update(data) {
    return this.helperService.post("Products/edit/" + data.id, data);
  }

  delete(id) {
    return this.helperService.post("Products/remove/"+id, id);
  }

  GetImgProductFeature(id) {
    return this.helperService.get("Products/GetImgProductFeature", id);
  }

  createImgFeature(data) {
    return this.helperService.post("ImgProductFeatures", data);
  }

  updateImgFeature(data) {
    console.log("ImgProductFeatures/" + data.id)
    return this.helperService.put("ImgProductFeatures/" + data.id, data);
  }

  UpdateAvatar(val) {
    return this.helperService.post("Products/savefile", val)
  }

}
