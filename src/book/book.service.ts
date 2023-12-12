import {Injectable} from '@nestjs/common';
import {Book} from './book';

export abstract class BookRepository {
  abstract save(book: Book): Promise<Book>;
  abstract findOne(id: string): Promise<Book | null>;
}

export class BookNotFoundError extends Error {
  constructor(bookId: string) {
    super(`Book ${bookId} not found`);
  }
}

export class BookAlreadyBorrowedError extends Error {
  constructor(bookId: string) {
    super(`Book ${bookId} already borrowed`);
  }
}

export class BookNotBorrowedError extends Error {
  constructor(bookId: string) {
    super(`Book ${bookId} not borrowed, cannot return`);
  }
}

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {
    this.bookRepository = bookRepository;
  }

  async createBook(title: string, author: string): Promise<Book> {
    const book = new Book(title, author);
    return this.bookRepository.save(book);
  }

  async borrowBook(bookId: string, name: string): Promise<Book> {
    const book = await this.bookRepository.findOne(bookId);

    if (!book) {
      throw new Error('Book not found');
    }

    try {
      book.borrow(name);
    } catch (e) {
      throw new BookAlreadyBorrowedError(bookId);
    }
    return this.bookRepository.save(book);
  }

  async returnBook(bookId: string): Promise<Book> {
    const book = await this.bookRepository.findOne(bookId);

    if (!book) {
      throw new Error('Book not found');
    }

    try {
      book.return();
    } catch (e) {
      throw new BookNotBorrowedError(bookId);
    }
    return this.bookRepository.save(book);
  }
}
