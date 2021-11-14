import { Injectable } from "@angular/core";
import { HelperService } from "src/app/_helpers/helper.service";

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    constructor(private helperService: HelperService) { }

    getCategorys() {
        return this.helperService.getAll("Category/get-all-category");
    }

    addComment() {
        // return this.helperService.postUrl("Category/get-all-category");
    }

}