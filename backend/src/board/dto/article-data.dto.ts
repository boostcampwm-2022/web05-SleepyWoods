import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { articleCategory } from '../article.enum';

export class ArticleDataDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  content: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  category: articleCategory;
}
