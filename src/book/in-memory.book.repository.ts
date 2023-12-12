import {Book} from './book';
import {BookRepository} from './book.service';

export class InMemoryBookRepository implements BookRepository {
  private books: Book[] = [];

  async save(book: Book): Promise<void> {
    this.books.push(book);
  }

  async findOne(id: string): Promise<Book | null> {
    return this.books.find(book => book.id === id) || null;
  }
}
