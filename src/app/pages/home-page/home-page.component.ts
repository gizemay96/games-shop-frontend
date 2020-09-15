import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private productService: ProductService) {}

  get products() {
    return this.productService.getProducts();
  }
  
    get Categories(){
      return this.productService.getCategories()
    }

  get console() {
    return this.products.filter((p) => p.categories[0].id == 8);
  }

  get psGames() {
    return this.products.filter((p) => p.categories[0].id == 5);
  }
  get xboxGames() {
    return this.products.filter((p) => p.categories[0].id == 6);
  }
  get nintendoGames() {
    return this.products.filter((p) => p.categories[0].id == 7);
  }
  get pcGames() {
    return this.products.filter((p) => p.categories[0].id == 9);
  }

  ngOnInit(): void {
    this.productService.fetchProducts();
    this.productService.fetchCategories();
  }
}
