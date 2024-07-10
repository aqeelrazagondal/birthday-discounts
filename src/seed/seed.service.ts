// src/seed/seed.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { Product } from '../product/entities/product.entity';
import { Promo } from '../promo/entities/promo.entity';
import { SuggestedProduct } from '../suggestion/entities/suggestion.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  async onModuleInit() {
    /**
     * Seed the database with some initial data
     * UnComment it to seed the database
     */
    // await this.seed();
  }

  /**
   * Seed the database with some initial data
   * @private
   */
  private async seed() {
    // Seed Users
    const user1 = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      dob: new Date('1990-07-16'),
      password: 'password',
    });
    const user2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      dob: new Date('1985-07-16'),
      password: 'password',
    });

    // Seed Products
    const product1 = await Product.create({
      name: 'Product 1',
      price: 100.0,
      description: 'Description for product 1',
    });
    const product2 = await Product.create({
      name: 'Product 2',
      price: 150.0,
      description: 'Description for product 2',
    });

    // Seed Promos
    await Promo.create({
      userId: user1.id,
      code: 'DISCOUNT50',
      expiryDate: new Date('2024-07-16'),
    });
    await Promo.create({
      userId: user2.id,
      code: 'DISCOUNT30',
      expiryDate: new Date('2024-07-18'),
    });

    // Seed Suggested Products
    await SuggestedProduct.create({
      id: 1,
      userId: user1.id,
      productId: product1.id,
    });
    await SuggestedProduct.create({
      id: 2,
      userId: user1.id,
      productId: product2.id,
    });
    await SuggestedProduct.create({
      id: 3,
      userId: user2.id,
      productId: product1.id,
    });
  }
}
