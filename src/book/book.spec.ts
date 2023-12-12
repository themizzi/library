import {Book} from './book';

describe('Book', () => {
  it('should create a book', () => {
    // GIVEN
    const title = 'The Lord of the Rings';
    const author = 'J.R.R. Tolkien';

    // WHEN
    const book = new Book(title, author);

    // THEN
    expect(book).toBeDefined();
  });
});
