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

  selectedProduct:Product;
  currentRate:number;


  constructor(
    private productService: ProductService,
    private cartService:CartService,
    private userService:UserService
    ) {}

  // ------- GET DATA ----------

  get user(){
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
    this.productService.fetchProducts();
    this.productService.fetchPsGames();
    this.productService.fetchXboxGames();
    this.productService.fetchNintendoGames();
    this.productService.fetchPcGames();
  }

  // ------------------ PREVIOUS PAGE FUNCTION ---------------- // 
  previousData(categoryId) {
    // ----- Previous PC games ------
    if (categoryId == 9) {
      if (this.pcCounts.startingNumber != 0) {
        const startNum = this.pcCounts.startingNumber - 4;
        const pageNum = this.pcCounts.pageCount - 1;
        this.productService.fetchPcGames(startNum, pageNum);
      }
    }
    // ----- Previous Playstation games ------
    else if (categoryId == 5) {
      if (this.psCounts.startingNumber != 0) {
        const start = this.psCounts.startingNumber - 4;
        this.productService.fetchPsGames(start);
      }
    }
    // ----- Previous Xbox games ------
    else if (categoryId == 6) {
      if (this.xboxCounts.startingNumber != 0) {
        const start = this.xboxCounts.startingNumber - 4;
        this.productService.fetchXboxGames(start);
      }
    }
    // ----- Previous Nintendo games ------
    else if (categoryId == 7) {
      if (this.nintendoCounts.startingNumber != 0) {
        const start = this.nintendoCounts.startingNumber - 4;
        this.productService.fetchNintendoGames(start);
      }
    }
  }

  // ------------------ NEXT PAGE FUNCTION ---------------- // 
  nextData(categoryId) {
    // ----- Fetch More PC games ------
    if (categoryId == 9) {
      const startNum = this.pcCounts.startingNumber + 4;
      const pageNum = this.pcCounts.pageCount + 1;
      this.productService.fetchPcGames(startNum, pageNum);
    }
    // ----- Fetch More Playstation games ------
    else if (categoryId == 5) {
      const startNum = this.psCounts.startingNumber + 4;
      const pageNum = this.psCounts.pageCount + 1;
      this.productService.fetchPsGames(startNum, pageNum);
    }
    // ----- Fetch More Xbox games ------
    else if (categoryId == 6) {
      const startNum = this.xboxCounts.startingNumber + 4;
      const pageNum = this.xboxCounts.pageCount + 1;
      this.productService.fetchXboxGames(startNum, pageNum);
    }
    // ----- Fetch More Nintendo games ------
    else if (categoryId == 7) {
      const startNum = this.nintendoCounts.startingNumber + 4;
      const pageNum = this.nintendoCounts.pageCount + 1;
      this.productService.fetchNintendoGames(startNum, pageNum);
    }
  }

  selectedProd(productId) {
    this.selectedProduct =  this.allProducts.find(p => p.id == productId);
    this.currentRate = this.selectedProduct.rating;
  }

  addToCart(product){
    this.cartService.addToCart(product , this.user.id)
  }
}
