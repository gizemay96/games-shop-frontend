import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { Product } from 'src/app/types/product.type';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  selectedProduct: Product;
  currentRate: number;
  loading = false;
  loadingChangeId: any = '1';

  // Products 
  products = {
    all: [],
    pcGames: [],
    playstationGames: [],
    xboxGames: [],
    nintendoGames: [],
  }

  pageNumbers = {
    PcCounts: { pageCount: 1, startingNumber: 0 },
    PsCounts: { pageCount: 1, startingNumber: 0 },
    XboxCounts: { pageCount: 1, startingNumber: 0 },
    NintendoCounts: { pageCount: 1, startingNumber: 0 }
  }


  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private userService: UserService
  ) { }

  // ------- GET DATA ----------

  get user() {
    return this.userService.getUser();
  }

  // ------- GET COUNTS ----------

  get pcCounts() {
    return this.pageNumbers.PcCounts;
  }

  get psCounts() {
    return this.pageNumbers.PsCounts;
  }

  get xboxCounts() {
    return this.pageNumbers.XboxCounts;
  }

  get nintendoCounts() {
    return this.pageNumbers.NintendoCounts;
  }
  // ---

  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts() {
    this.loading = true;

    this.products.all = await this.productService.fetchProducts().toPromise();
    this.products.pcGames = await this.productService.fetchPcGames().toPromise();
    this.products.playstationGames = await this.productService.fetchPsGames().toPromise();
    this.products.xboxGames = await this.productService.fetchXboxGames().toPromise();
    this.products.nintendoGames = await this.productService.fetchNintendoGames().toPromise();
    console.log(this.products);

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }


  // ------------------ PREVIOUS PAGE FUNCTION ---------------- // 
  async previousData(categoryId) {
    this.loadingChangeId = categoryId;
    // ----- Previous PC games ------
    if (categoryId == '5ffb1da2e043661d30d0833e') {
      if (this.pcCounts.startingNumber != 0) {
        this.pcCounts.startingNumber = this.pcCounts.startingNumber - 4;
        this.products.pcGames = await this.productService.fetchPcGames(this.pcCounts.startingNumber).toPromise();
        this.pcCounts.pageCount = this.pcCounts.pageCount - 1;
      }
    }
    // ----- Previous Playstation games ------
    else if (categoryId == '5ffb3f9ef03198001780d3ad') {
      if (this.psCounts.startingNumber != 0) {
        this.psCounts.startingNumber = this.psCounts.startingNumber - 4;
        this.products.playstationGames = await this.productService.fetchPsGames(this.psCounts.startingNumber).toPromise();
        this.psCounts.pageCount = this.psCounts.pageCount - 1;
      }
    }
    // ----- Previous Xbox games ------
    else if (categoryId == '5ffb3fc9f03198001780d3ae') {
      if (this.xboxCounts.startingNumber != 0) {
        this.xboxCounts.startingNumber = this.xboxCounts.startingNumber - 4;
        this.products.xboxGames = await this.productService.fetchXboxGames(this.xboxCounts.startingNumber).toPromise();
        this.xboxCounts.pageCount = this.xboxCounts.pageCount - 1;
      }
    }
    // ----- Previous Nintendo games ------
    else if (categoryId == '5ffb3fe1f03198001780d3af') {
      if (this.nintendoCounts.startingNumber != 0) {
        this.nintendoCounts.startingNumber = this.nintendoCounts.startingNumber - 4;
        this.products.nintendoGames = await this.productService.fetchNintendoGames(this.nintendoCounts.startingNumber).toPromise();
        this.nintendoCounts.pageCount = this.nintendoCounts.pageCount - 1;
      }
    }
    setTimeout(() => {
      this.loadingChangeId = '1';
    }, 600);
  }

  // ------------------ NEXT PAGE FUNCTION ---------------- // 
  async nextData(categoryId) {
    this.loadingChangeId = categoryId;

    // ----- Fetch More PC games ------
    if (categoryId == '5ffb1da2e043661d30d0833e') {
      this.pcCounts.startingNumber = this.pcCounts.startingNumber + 4;
      this.products.pcGames = await this.productService.fetchPcGames(this.pcCounts.startingNumber).toPromise();
      this.pcCounts.pageCount = this.pcCounts.pageCount + 1;
    }

    // ----- Fetch More Playstation games ------
    else if (categoryId == '5ffb3f9ef03198001780d3ad') {
      this.psCounts.startingNumber = this.psCounts.startingNumber + 4;
      this.products.playstationGames = await this.productService.fetchPsGames(this.psCounts.startingNumber).toPromise();
      this.psCounts.pageCount = this.psCounts.pageCount + 1;
    }

    // ----- Fetch More Xbox games ------
    else if (categoryId == '5ffb3fc9f03198001780d3ae') {
      this.xboxCounts.startingNumber = this.xboxCounts.startingNumber + 4;
      this.products.xboxGames = await this.productService.fetchXboxGames(this.xboxCounts.startingNumber).toPromise();
      this.xboxCounts.pageCount = this.xboxCounts.pageCount + 1;
    }

    // ----- Fetch More Nintendo games ------
    else if (categoryId == '5ffb3fe1f03198001780d3af') {
      this.nintendoCounts.startingNumber = this.nintendoCounts.startingNumber + 4;
      this.products.nintendoGames = await this.productService.fetchNintendoGames(this.nintendoCounts.startingNumber).toPromise();
      this.nintendoCounts.pageCount = this.nintendoCounts.pageCount + 1;
    }

    setTimeout(() => {
      this.loadingChangeId = '1';
    }, 600);

  }

  selectedProd(productId) {
    this.selectedProduct = this.products.all.find(p => p.id == productId);
    this.currentRate = this.selectedProduct.rating;
  }

  addToCart(product) {
    this.cartService.addToCart(product, this.user.id)
  }
}
