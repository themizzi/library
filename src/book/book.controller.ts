import {
  BadRequestException,
  Controller,
  NotFoundException,
  Post,
  Put,
} from '@nestjs/common';
import {IsDefined, IsString} from 'class-validator';
import {
  BookNotBorrowedError,
  BookNotFoundError,
  BookService,
} from './book.service';

export class CreateBookRequest {
  @IsDefined()
  @IsString()
  title!: string;

  @IsDefined()
  @IsString()
  author!: string;
}

export class BorrowBookRequest {
  @IsDefined()
  @IsString()
  name!: string;
}

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(): Promise<void> {
    await this.bookService.createBook('The Hobbit', 'J.R.R. Tolkien');
  }

  @Put(':id/borrow')
  async borrowBook(): Promise<void> {
    try {
      await this.bookService.borrowBook('1', 'John Doe');
    } catch (e) {
      if (e instanceof BookNotBorrowedError) {
        throw new BadRequestException(e.message);
      } else if (e instanceof BookNotFoundError) {
        throw new NotFoundException(e.message);
      }
      throw e;
    }
  }

  @Put(':id/return')
  async returnBook(): Promise<void> {
    try {
      await this.bookService.returnBook('1');
    } catch (e) {
      if (e instanceof BookNotBorrowedError) {
        throw new BadRequestException(e.message);
      } else if (e instanceof BookNotFoundError) {
        throw new NotFoundException(e.message);
      }
      throw e;
    }
  }
}
