import { Injectable } from "@angular/core";
import { HelperService } from "src/app/_helpers/helper.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private helperService: HelperService) { }

  getProfile(id: string) {
    return this.helperService.getAll("Dashboard/get-user-detail/" + id);
  }

  getBlogById() {
    let param = '?pageIndex=1&pageSize=10';
    return this.helperService.getParam("Blog/get-all-blog-by-user", param);
  }

  updateProfile(data) {
    return this.helperService.post("User/update-profile-user", data);
  }

}
