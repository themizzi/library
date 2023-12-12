import {Expose} from 'class-transformer';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

export enum BookStatus {
  AVAILABLE = 'AVAILABLE',
  BORROWED = 'BORROWED',
}

export class BookAlreadyBorrowedError extends Error {
  constructor() {
    super('Book already borrowed');
  }
}

export class BookNotBorrowedError extends Error {
  constructor() {
    super('Book not borrowed');
  }
}

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  readonly id?: string;

  @Column({type: 'varchar'})
  @Expose()
  readonly title: string;

  @Column({type: 'varchar'})
  @Expose()
  readonly author: string;

  @Column({
    type: 'enum',
    enum: BookStatus,
    default: BookStatus.AVAILABLE,
    name: 'status',
  })
  private _status: BookStatus = BookStatus.AVAILABLE;
  @Expose()
  get status(): BookStatus {
    return this._status;
  }

  @Column({type: 'varchar', nullable: true, name: 'borrowedBy'})
  private _borrowedBy?: string;
  @Expose()
  get borrowedBy(): string | undefined {
    return this._borrowedBy;
  }

  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
  }

  borrow(name: string): void {
    if (this._status === BookStatus.AVAILABLE) {
      this._status = BookStatus.BORROWED;
      this._borrowedBy = name;
    } else {
      throw new BookAlreadyBorrowedError();
    }
  }

  return(): void {
    if (this._status === BookStatus.BORROWED) {
      this._status = BookStatus.AVAILABLE;
      this._borrowedBy = undefined;
    } else {
      throw new BookNotBorrowedError();
    }
  }
}
