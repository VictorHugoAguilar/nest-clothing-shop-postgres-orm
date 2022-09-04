import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';

import { User } from './../auth/entities/user.entity';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductsService) {}

  async runSeed(user: User) {
    await this.insertNewProducts(user);
    return 'Seed executed';
  }

  private async insertNewProducts(user: User) {
    // Delete tables
    this.productService.deleteAllProducts();

    const products = initialData.products;

    const insertPromises = [];

    products.forEach((product) => {
      insertPromises.push(this.productService.create(product, user));
    });

    await Promise.all(insertPromises);

    return true;
  }
}
