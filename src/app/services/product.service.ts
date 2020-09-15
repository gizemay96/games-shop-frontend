import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../types/category.type';
import { Product } from '../types/product.type';
import { environment as env } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [];
  private categories: Category[] = [];
  private filteredProducts: Product[];

  constructor(private http: HttpClient) {}

  fetchProducts() {
    this.http.get(env.productsApiURL).subscribe((response: Product[]) => {
      console.log(response);
      this.products = response;
    });
  }

  fetchCategories() {
    this.http.get(env.categoriesApiURL).subscribe((response: Category[]) => {
      this.categories = response;
    });
  }

  filterProducts(genreId) {
    this.filteredProducts = this.products.filter((product) =>
      product.categories.some((category) => category.id === genreId)
      );
  }

  getProducts() {
    return this.products;
  }

  getFilteredProducts() {
    return this.filteredProducts;
  }

  getCategories() {
    return this.categories;
  }
}
