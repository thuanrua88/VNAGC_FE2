import { Injectable } from "@angular/core";
import { HelperService } from "src/app/_helpers/helper.service";

@Injectable({
    providedIn: 'root'
})

export class HashtagService {
    constructor(private helperService: HelperService) { }

    getHashtags() {
        return this.helperService.getAll("HashTag/get-all-hash-tag");
    }

    createHashtag(name) {
        let param = '';
        param += '?name=' + name;
        return this.helperService.postUrl("Hashtag/create", name, param);
    }

    updateHashtag(data) {
        let param = '';
        param += '?name=' + data;
        return this.helperService.put("Hashtag/edit", data);
    }

    deleteHashtag(id) {
        return this.helperService.delete("Hashtag/remove", id);

    }
}