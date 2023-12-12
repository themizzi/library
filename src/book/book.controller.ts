import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  NotFoundException,
  Param,
  Post,
  Put,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiProperty,
} from '@nestjs/swagger';
import {IsDefined, IsString} from 'class-validator';
import {Book} from './book';
import {
  BookNotBorrowedError,
  BookNotFoundError,
  BookService,
} from './book.service';

export class CreateBookRequest {
  @IsDefined()
  @IsString()
  @ApiProperty()
  title!: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  author!: string;
}

export class BorrowBookRequest {
  @IsDefined()
  @IsString()
  @ApiProperty()
  name!: string;
}

@Controller('book')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
  excludeExtraneousValues: true,
})
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The book has been successfully created.',
  })
  @ApiBadRequestResponse({description: 'Bad request.'})
  async createBook(
    @Body() createBookRequest: CreateBookRequest
  ): Promise<Book> {
    return await this.bookService.createBook(
      createBookRequest.title,
      createBookRequest.author
    );
  }

  @Put(':id/borrow')
  async borrowBook(
    @Param('id') id: string,
    @Body() borrowBookRequest: BorrowBookRequest
  ): Promise<Book> {
    try {
      return await this.bookService.borrowBook(id, borrowBookRequest.name);
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
  async returnBook(@Param('id') id: string): Promise<Book> {
    try {
      return this.bookService.returnBook(id);
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
