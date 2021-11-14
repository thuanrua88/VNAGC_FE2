import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/_service/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListProductComponent implements OnInit {
  listProduct: any = [];
  load = true;
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    Promise.all(
      [
        this.getProduct()
      ]
    ).then(
      (dt: any) => {
        this.listProduct = dt[0].Data;

        this.load = false;
      },
      err => {
        console.log(err)
        this.load = false;
      }
    )
  }

  getProduct(): Promise<any> {
    return new Promise(async (resolve) => {
      const dt = await this.productService.getAllProducts().toPromise();
      resolve(dt);
    });
  }

  deleteProduct(id) {
    if (confirm("Delete ok?")) {
      this.productService.delete(id).subscribe(
        dt => {
          window.location.reload()
        },
        err => {
          this.load = false;
        }
      )
    }
  }
}
