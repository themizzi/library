import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Book} from './book';
import {BookController} from './book.controller';
import {BookRepository, BookService} from './book.service';
import {TypeOrmBookRepository} from './typeorm.book.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BookController],
  providers: [
    BookService,
    {
      provide: BookRepository,
      useClass: TypeOrmBookRepository,
    },
  ],
})
export class BookModule {}
