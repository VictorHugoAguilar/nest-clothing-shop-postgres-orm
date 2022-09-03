import { text } from 'stream/consumers';
import { ProductImage } from './product-image.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  title: string;

  @Column('float', {
    default: 0,
  })
  price: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'text',
    unique: true,
  })
  slug: string;

  @Column({
    type: 'int',
    default: 0,
  })
  stock: number;

  @Column({
    type: 'text',
    array: true,
  })
  sizes: string[];

  @Column({
    type: 'text',
  })
  gender: string;

  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  tags: string[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
  })
  images?: ProductImage[];

  @BeforeInsert()
  checkSlugInsert() {
    this.handleDBSlug(false);
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.handleDBSlug(true);
  }

  handleDBSlug(isUpdate: boolean) {
    if (!isUpdate && !this.slug) {
      this.slug = this.formatSlug(this.title);
    } else if (this.slug) {
      this.slug = this.formatSlug(this.slug);
    }
  }

  formatSlug(textToFormat: string) {
    return textToFormat
      .toLocaleLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '_')
      .replaceAll('`', '_');
  }
}
