// frontend/src/app/features/products/user-product-list/user-product-list.component.ts
import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule, CurrencyPipe, SlicePipe, DecimalPipe } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { Product } from '../../../shared/models/product.model';
import { Category } from '../../../shared/models/category.model';
import { ProductService } from '../product.service';
import { CartService } from '../../shopping-cart/cart.service';
import { CategoryAdminService } from '../../admin/services/category.admin.service';
import { AddToCartRequest } from '../../../shared/models/cart.model';

@Component({
  selector: 'app-user-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatChipsModule,
    MatCheckboxModule,
    CurrencyPipe,
    SlicePipe,
    DecimalPipe
  ],
  templateUrl: './user-product-list.component.html',
  styleUrls: ['./user-product-list.component.scss']
})
export class UserProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  selectedCategoryId: number | null = null;
  selectedCategoryName: string | null = null;
  searchText: string = '';
  isLoading = true;
  error: string | null = null;
  isAddingToCart: { [key: number]: boolean } = {};
  
  // Additional filter properties
  sortBy: string = 'default';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  showInStockOnly: boolean = false;
  minRating: number | null = null;
  
  // Pagination
  pageSize = 12;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private categoryService = inject(CategoryAdminService);
  private snackBar = inject(MatSnackBar);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    // Listen for query parameter changes
    this.route.queryParams.subscribe(params => {
      // Handle category filter from query params
      if (params['category']) {
        this.selectedCategoryName = params['category'];
      } else {
        this.selectedCategoryName = null;
      }
      
      if (params['search']) {
        this.searchText = params['search'];
      }
      
      this.loadCategories();
      this.loadProducts();
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
        // If we have a category name from query params, find its ID
        if (this.selectedCategoryName) {
          const category = this.categories.find(c => 
            c.name.toLowerCase() === this.selectedCategoryName!.toLowerCase()
          );
          if (category) {
            this.selectedCategoryId = category.id!;
          }
        }
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
      }
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = null;
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.applyFilters(); // Apply filters after loading
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Nu s-au putut încărca produsele.';
        console.error(err);
        this.isLoading = false;
        this.snackBar.open(this.error, 'Închide', { duration: 5000 });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchText = filterValue;
    this.applyFilters();
  }

  applyCategoryFilter(): void {
    // Update selectedCategoryName when dropdown changes
    if (this.selectedCategoryId) {
      const category = this.categories.find(c => c.id === this.selectedCategoryId);
      this.selectedCategoryName = category ? category.name : null;
    } else {
      this.selectedCategoryName = null;
    }
    this.applyFilters();
  }

  clearCategoryFilter(): void {
    this.selectedCategoryId = null;
    this.selectedCategoryName = null;
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = this.products;

    // Apply text filter
    if (this.searchText) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        product.categoryName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        product.description?.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    // Apply category filter by name (from query params) or by ID (from dropdown)
    if (this.selectedCategoryName) {
      filtered = filtered.filter(product => 
        product.categoryName?.toLowerCase() === this.selectedCategoryName!.toLowerCase()
      );
    } else if (this.selectedCategoryId !== null) {
      filtered = filtered.filter(product => 
        product.categoryId === this.selectedCategoryId
      );
    }

    // Apply price range filter
    if (this.minPrice !== null) {
      filtered = filtered.filter(product => product.price >= this.minPrice!);
    }
    if (this.maxPrice !== null) {
      filtered = filtered.filter(product => product.price <= this.maxPrice!);
    }

    // Apply stock filter
    if (this.showInStockOnly) {
      filtered = filtered.filter(product => product.stockQuantity > 0);
    }

    // Apply rating filter
    if (this.minRating !== null) {
      filtered = filtered.filter(product => 
        (product.averageRating || 0) >= this.minRating!
      );
    }

    this.filteredProducts = filtered;

    // Apply sorting
    this.sortProducts();

    // Reset to first page when filtering
    this.pageIndex = 0;
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  sortProducts(): void {
    switch (this.sortBy) {
      case 'price-asc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'stock':
        this.filteredProducts.sort((a, b) => b.stockQuantity - a.stockQuantity);
        break;
      case 'rating':
        this.filteredProducts.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
        break;
      default:
        // Keep original order
        break;
    }
  }

  onSortChange(): void {
    this.applyFilters();
  }

  clearAllFilters(): void {
    this.selectedCategoryId = null;
    this.selectedCategoryName = null;
    this.searchText = '';
    this.sortBy = 'default';
    this.minPrice = null;
    this.maxPrice = null;
    this.showInStockOnly = false;
    this.minRating = null;
    this.applyFilters();
  }

  getSortLabel(): string {
    const labels: { [key: string]: string } = {
      'price-asc': 'Preț crescător',
      'price-desc': 'Preț descrescător',
      'name-asc': 'Nume A-Z',
      'name-desc': 'Nume Z-A',
      'stock': 'Stoc disponibil',
      'rating': 'Cele mai apreciate'
    };
    return labels[this.sortBy] || '';
  }

  getStarArray(rating: number): boolean[] {
    return [1, 2, 3, 4, 5].map(star => star <= rating);
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  getPaginatedProducts(): Product[] {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredProducts.slice(startIndex, endIndex);
  }

  addToCart(product: Product): void {
    if (!product || typeof product.id === 'undefined') {
      this.snackBar.open('Detaliile produsului sunt incomplete.', 'Închide', { duration: 3000 });
      return;
    }

    this.isAddingToCart[product.id] = true;

    const request: AddToCartRequest = {
      productId: product.id,
      quantity: 1
    };

    this.cartService.addToCart(request).subscribe({
      next: () => {
        this.isAddingToCart[product.id!] = false;
        this.snackBar.open(`"${product.name}" a fost adăugat în coș!`, 'OK', {
          duration: 3000,
        });
      },
      error: (err) => {
        this.isAddingToCart[product.id!] = false;
        const errorMessage = err.error?.message || 'A apărut o eroare la adăugarea produsului în coș.';
        this.snackBar.open(errorMessage, 'Închide', {
          duration: 5000
        });
        console.error('Error adding to cart:', err);
      }
    });
  }
}