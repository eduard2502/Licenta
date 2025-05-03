import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from './models/product.model';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products: Product[] = [
      { id: 1, nume: 'Calculator A', procesor: 'i5', memorie: 8, stoc: 10, pret: 2500 },
      { id: 2, nume: 'Calculator B', procesor: 'i7', memorie: 16, stoc: 5, pret: 4000 },
      // …alte produse mock
    ];
    return { products };
  }
}
