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

  constructor(private http: HttpClient) { }

  // -----------------------------    FETCH ALL PRODUCTS AND FILTER PRODUCTS FUNCTIONS -----------------------------
  fetchProducts() {
    const request = this.http.get(env.productsApiURL);
    return request.pipe(map((res: any) => res), catchError(() => of(null)));
  }
  fetchPsGames(start: number = 0) {
    const request = this.http.get(`${env.productsApiURL}?categories=5ffb3f9ef03198001780d3ad&_start=${start}&_limit=4`);
    return request.pipe(map((res: any) => res), catchError(() => of(null)));
  }
  
  fetchXboxGames(s: number = 0) {
    const request = this.http.get(`${env.productsApiURL}?categories=5ffb3fc9f03198001780d3ae&_start=${s}&_limit=4`);
    return request.pipe(map((res: any) => res), catchError(() => of(null)));
  }
  fetchNintendoGames(s: number = 0) {
    const request = this.http.get(`${env.productsApiURL}?categories=5ffb3fe1f03198001780d3af&_start=${s}&_limit=4`);
    return request.pipe(map((res: any) => res), catchError(() => of(null)));
  }
  
  fetchPcGames(s: number = 0) {
    const request = this.http.get(`${env.productsApiURL}?categories=5ffb1da2e043661d30d0833e&_start=${s}&_limit=4`);
    return request.pipe(map((res: any) => res), catchError(() => of(null)));
  }

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
}
