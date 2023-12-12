import {Injectable} from '@nestjs/common';
import {BookRepository} from './book.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Book} from './book';

@Injectable()
export class TypeOrmBookRepository implements BookRepository {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>
  ) {}

  async save(book: Book) {
    return this.bookRepository.save(book);
  }

  async findOne(id: string): Promise<Book | null> {
    return await this.bookRepository.findOne({
      where: {id: id},
    });
  }
}
