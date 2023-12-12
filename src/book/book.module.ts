import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Book} from './book';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [],
  providers: [],
})
export class BookModule {}
