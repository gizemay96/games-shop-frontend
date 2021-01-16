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


  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private userService: UserService
  ) { }

  // ------- GET DATA ----------

  get user() {
    return this.userService.getUser();
  }

  get allProducts() {
    return this.productService.getProducts();
  }

  get psGames() {
    return this.productService.getPsGames();
  }
  get xboxGames() {
    return this.productService.getXboxGames();
  }
  get nintendoGames() {
    return this.productService.getNintendoGames();
  }
  get pcGames() {
    return this.productService.getPcGames();
  }
  // ---

  // ------- GET COUNTS ----------

  get pcCounts() {
    return this.productService.getStartPcCount();
  }

  get psCounts() {
    return this.productService.getStartPsCount();
  }

  get xboxCounts() {
    return this.productService.getStartXboxCount();
  }

  get nintendoCounts() {
    return this.productService.getStartNintendoCount();
  }
  // ---

  ngOnInit(): void {
    this.loading = true;
    this.productService.fetchProducts();
    this.productService.fetchPsGames();
    this.productService.fetchXboxGames();
    this.productService.fetchNintendoGames();
    this.productService.fetchPcGames();
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }


  // ------------------ PREVIOUS PAGE FUNCTION ---------------- // 
  previousData(categoryId) {
    this.loadingChangeId = categoryId;
    // ----- Previous PC games ------
    if (categoryId == '5ffb1da2e043661d30d0833e') {
      if (this.pcCounts.startingNumber != 0) {
        const startNum = this.pcCounts.startingNumber - 4;
        const pageNum = this.pcCounts.pageCount - 1;
        this.productService.fetchPcGames(startNum, pageNum);
      }
    }
    // ----- Previous Playstation games ------
    else if (categoryId == '5ffb3f9ef03198001780d3ad') {
      if (this.psCounts.startingNumber != 0) {
        const start = this.psCounts.startingNumber - 4;
        this.productService.fetchPsGames(start);
      }
    }
    // ----- Previous Xbox games ------
    else if (categoryId == '5ffb3fc9f03198001780d3ae') {
      if (this.xboxCounts.startingNumber != 0) {
        const start = this.xboxCounts.startingNumber - 4;
        this.productService.fetchXboxGames(start);
      }
    }
    // ----- Previous Nintendo games ------
    else if (categoryId == '5ffb3fe1f03198001780d3af') {
      if (this.nintendoCounts.startingNumber != 0) {
        const start = this.nintendoCounts.startingNumber - 4;
        this.productService.fetchNintendoGames(start);
      }
    }
    setTimeout(() => {
      this.loadingChangeId = '1';
    }, 600);
  }

  // ------------------ NEXT PAGE FUNCTION ---------------- // 
  nextData(categoryId) {
    this.loadingChangeId = categoryId;
    // ----- Fetch More PC games ------
    if (categoryId == '5ffb1da2e043661d30d0833e') {
      const startNum = this.pcCounts.startingNumber + 4;
      const pageNum = this.pcCounts.pageCount + 1;
      this.productService.fetchPcGames(startNum, pageNum);
    }
    // ----- Fetch More Playstation games ------
    else if (categoryId == '5ffb3f9ef03198001780d3ad') {
      const startNum = this.psCounts.startingNumber + 4;
      const pageNum = this.psCounts.pageCount + 1;
      this.productService.fetchPsGames(startNum, pageNum);
    }
    // ----- Fetch More Xbox games ------
    else if (categoryId == '5ffb3fc9f03198001780d3ae') {
      const startNum = this.xboxCounts.startingNumber + 4;
      const pageNum = this.xboxCounts.pageCount + 1;
      this.productService.fetchXboxGames(startNum, pageNum);
    }
    // ----- Fetch More Nintendo games ------
    else if (categoryId == '5ffb3fe1f03198001780d3af') {
      const startNum = this.nintendoCounts.startingNumber + 4;
      const pageNum = this.nintendoCounts.pageCount + 1;
      this.productService.fetchNintendoGames(startNum, pageNum);
    }
    setTimeout(() => {
      this.loadingChangeId = '1';
    }, 600);
  }

  selectedProd(productId) {
    this.selectedProduct = this.allProducts.find(p => p.id == productId);
    this.currentRate = this.selectedProduct.rating;
  }

  addToCart(product) {
    this.cartService.addToCart(product, this.user.id)
  }
}
