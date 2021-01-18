import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../types/category.type';
import { Product } from '../types/product.type';
import { environment as env } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // private products: Product[] = [];
  // private categories: Category[] = [];
  // private filteredProducts: Product[];

  // private psGames: Product[] = [];
  // private xboxGames: Product[] = [];
  // private nintendoGames: Product[] = [];
  // private pcGames: Product[] = [];


  constructor(private http: HttpClient) { }

  // -----------------------------    FETCH ALL PRODUCTS AND FILTER PRODUCTS FUNCTIONS -----------------------------

  // fetchProducts() {
  //   this.http.get(env.productsApiURL).subscribe((response: Product[]) => {
  //     this.products = response;
  //   });
  // }
  fetchProducts() {
    const request = this.http.get(env.productsApiURL);
    return request.pipe(map((res: any) => res), catchError(() => of(null)));
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

  // getProducts() {
  //   return this.products;
  // }

  setPageCount(start: number = 0, p: number = 1 , numberfor = ''){

  }

  // getFilteredProducts() {
  //   return this.filteredProducts;
  // }

  // getCategories() {
  //   return this.categories;
  // }


  // -----------------------------  FETCH CATEGORIES WITH LIMIT  -----------------------------


  // fetchPsGames(start: number = 0, p: number = 1) {
  //   this.http
  //     .get(`${env.productsApiURL}?categories=5ffb3f9ef03198001780d3ad&_start=${start}&_limit=4`)
  //     .subscribe((response: Product[]) => {
  //       if (response.length != 0) {
  //         this.psGames = response;
  //         this.PsCounts[0].startingNumber = start;
  //         this.PsCounts[0].pageCount = p;
  //       } else {
  //         return;
  //       }
  //     });
  // }

  fetchPsGames(start: number = 0, p: number = 1) {
    const request = this.http.get(`${env.productsApiURL}?categories=5ffb3f9ef03198001780d3ad&_start=${start}&_limit=4`);
    return request.pipe(map((res: any) => res), catchError(() => of(null)));
  }

  fetchXboxGames(s: number = 0, p: number = 1) {
    const request = this.http.get(`${env.productsApiURL}?categories=5ffb3fc9f03198001780d3ae&_start=${s}&_limit=4`);
    return request.pipe(map((res: any) => res), catchError(() => of(null)));
  }

  // fetchXboxGames(s: number = 0, p: number = 1) {
  //   this.http
  //     .get(`${env.productsApiURL}?categories=5ffb3fc9f03198001780d3ae&_start=${s}&_limit=4`)
  //     .subscribe((response: Product[]) => {
  //       if (response.length != 0) {
  //         this.xboxGames = response;
  //         this.XboxCounts[0].startingNumber = s;
  //         this.XboxCounts[0].pageCount = p;
  //       } else {
  //         return;
  //       }
  //     });
  // }

  fetchNintendoGames(s: number = 0, p: number = 1) {
    const request = this.http.get(`${env.productsApiURL}?categories=5ffb3fe1f03198001780d3af&_start=${s}&_limit=4`);
    return request.pipe(map((res: any) => res), catchError(() => of(null)));
  }


  // fetchNintendoGames(s: number = 0, p: number = 1) {
  //   this.http
  //     .get(`${env.productsApiURL}?categories=5ffb3fe1f03198001780d3af&_start=${s}&_limit=4`)
  //     .subscribe((response: Product[]) => {
  //       if (response.length != 0) {
  //         this.nintendoGames = response;
  //         this.NintendoCounts[0].startingNumber = s;
  //         this.NintendoCounts[0].pageCount = p;
  //       } else {
  //         return;
  //       }
  //     });
  // }
  
  fetchPcGames(s: number = 0, p: number = 1) {
    const request = this.http.get(`${env.productsApiURL}?categories=5ffb1da2e043661d30d0833e&_start=${s}&_limit=4`);
    return request.pipe(map((res: any) => res), catchError(() => of(null)));
  }

  // fetchPcGames(s: number = 0, p: number = 1) {
  //   this.http
  //     .get(`${env.productsApiURL}?categories=5ffb1da2e043661d30d0833e&_start=${s}&_limit=4`)
  //     .subscribe((response: Product[]) => {
  //       if (response.length != 0) {
  //         this.pcGames = response;
  //         this.PcCounts[0].startingNumber = s;
  //         this.PcCounts[0].pageCount = p;
  //       } else {
  //         return;
  //       }
  //     });
  // }



  // --------------------------  GETTER FUNCTIONS ------------------ 

  // getPsGames() {
  //   return this.psGames;
  // }

  // getXboxGames() {
  //   return this.xboxGames;
  // }

  // getNintendoGames() {
  //   return this.nintendoGames;
  // }

  // getPcGames() {
  //   return this.pcGames;
  // }

  // getStartPcCount() {
  //   return this.PcCounts[0];
  // }

  // getStartPsCount() {
  //   return this.PsCounts[0];
  // }

  // getStartXboxCount() {
  //   return this.XboxCounts[0];
  // }

  // getStartNintendoCount() {
  //   return this.NintendoCounts[0];
  // }
}
