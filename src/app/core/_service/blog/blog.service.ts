import { Injectable } from '@angular/core';
import { HelperService } from 'src/app/_helpers/helper.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private helperService: HelperService) { }
  getAllBlogeres() {
    return this.helperService.getAll("Blog/get-all-blog?pageIndex=1&pageSize=100");
  }
  GetBlogsActive() {
    return this.helperService.getAll("Blog/GetBlogsActive");
  }

  getBlog(id) {
    return this.helperService.get("Blog/detail-edit", id);
  }

  create(data) {
    return this.helperService.post("Blog", data);
  }

  update(data) {
    return this.helperService.post("Blog/" + data.id, data);
  }

  activeBlog(data) {
    let param = `?id=${data.id}&status=${data.status}`
    return this.helperService.post("Blog/activeBlog" + param, data);
  }

  delete(id) {
    return this.helperService.delete("Blog", id);
  }

  // Metarial
  getMetarial(id) {
    return this.helperService.get("Metarials/GetMetarial", id);
  }

  createMetarial(data) {
    return this.helperService.post("Metarials", data);
  }

  updateMetarial(data) {
    return this.helperService.put("Metarials/" + data.id, data);
  }

  deleteMetarial(id) {
    return this.helperService.delete("Metarials", id);
  }

  // Step
  getStep(id) {
    return this.helperService.get("Steps/GetStep", id);
  }

  createStep(data) {
    return this.helperService.post("Steps", data);
  }

  updateStep(data) {
    return this.helperService.put("Steps/" + data.id, data);
  }

  deleteStep(id) {
    return this.helperService.delete("Steps", id);
  }
  // Content orther
  getContents(id) {
    return this.helperService.get("Contents/GetContent", id);
  }

  createContent(data) {
    return this.helperService.post("Contents", data);
  }

  updateContent(data) {
    return this.helperService.put("Contents/" + data.id, data);
  }

  deleteContent(id) {
    return this.helperService.delete("Contents", id);
  }
}
