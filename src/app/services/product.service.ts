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
  // private categories: Category[] = [];
  // private filteredProducts: Product[];

  private psGames: Product[] = [];
  private xboxGames: Product[] = [];
  private nintendoGames: Product[] = [];
  private pcGames: Product[] = [];

  private PcCounts = [{ pageCount: 1 }, { startingNumber: 0 }];
  private PsCounts = [{ pageCount: 1 }, { startingNumber: 0 }];
  private XboxCounts = [{ pageCount: 1 }, { startingNumber: 0 }];
  private NintendoCounts = [{ pageCount: 1 }, { startingNumber: 0 }];

  constructor(private http: HttpClient) {}

// -----------------------------    FETCH ALL PRODUCTS AND FILTER PRODUCTS FUNCTIONS -----------------------------

  fetchProducts() {
    this.http.get(env.productsApiURL).subscribe((response: Product[]) => {
      console.log(response);
      this.products = response;
    });
  }

  // fetchCategories() {
  //   this.http.get(env.categoriesApiURL).subscribe((response: Category[]) => {
  //     this.categories = response;
  //   });
  // }

  // filterProducts(genreId) {
  //   this.filteredProducts = this.products.filter((product) =>
  //     product.categories.some((category) => category.id === genreId)
  //     );
  // }

  getProducts() {
    return this.products;
  }

  // getFilteredProducts() {
  //   return this.filteredProducts;
  // }

  // getCategories() {
  //   return this.categories;
  // }


// -----------------------------  FETCH CATEGORIES WITH LIMIT  -----------------------------


  fetchPsGames(s: number = 0, p: number = 1) {
    this.http
      .get(`${env.productsApiURL}?categories=5&_start=${s}&_limit=4`)
      .subscribe((response: Product[]) => {
        if (response.length != 0) {
          this.psGames = response;
          this.PsCounts[0].startingNumber = s;
          this.PsCounts[0].pageCount = p;
        } else {
          return;
        }
      });
  }

  fetchXboxGames(s: number = 0, p: number = 1) {
    this.http
      .get(`${env.productsApiURL}?categories=6&_start=${s}&_limit=4`)
      .subscribe((response: Product[]) => {
        if (response.length != 0) {
          this.xboxGames = response;
          this.XboxCounts[0].startingNumber = s;
          this.XboxCounts[0].pageCount = p;
        } else {
          return;
        }
      });
  }

  fetchNintendoGames(s: number = 0, p: number = 1) {
    this.http
      .get(`${env.productsApiURL}?categories=7&_start=${s}&_limit=4`)
      .subscribe((response: Product[]) => {
        if (response.length != 0) {
          this.nintendoGames = response;
          this.NintendoCounts[0].startingNumber = s;
          this.NintendoCounts[0].pageCount = p;
        } else {
          return;
        }
      });
  }

  fetchPcGames(s: number = 0, p: number = 1) {
    this.http
      .get(`${env.productsApiURL}?categories=9&_start=${s}&_limit=4`)
      .subscribe((response: Product[]) => {
        if (response.length != 0) {
          console.log(response)
          this.pcGames = response;
          this.PcCounts[0].startingNumber = s;
          this.PcCounts[0].pageCount = p;
        } else {
          return;
        }
      });
  }



  // --------------------------  GETTER FUNCTIONS ------------------ 

  getPsGames() {
    return this.psGames;
  }

  getXboxGames() {
    return this.xboxGames;
  }

  getNintendoGames() {
    return this.nintendoGames;
  }

  getPcGames() {
    return this.pcGames;
  }

  getStartPcCount() {
    return this.PcCounts[0];
  }

  getStartPsCount() {
    return this.PsCounts[0];
  }

  getStartXboxCount() {
    return this.XboxCounts[0];
  }

  getStartNintendoCount() {
    return this.NintendoCounts[0];
  }
}
