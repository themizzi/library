import {Book} from './book';
import {BookRepository} from './book.service';

export class InMemoryBookRepository implements BookRepository {
  private books: Map<string, Book> = new Map();

  async save(book: Book): Promise<Book> {
    const id = this.books.entries.length.toString();
    Object.assign(book, {id});
    this.books.set(id, book);
    return book;
  }

  async findOne(id: string): Promise<Book | null> {
    return this.books.get(id) ?? null;
  }
}
