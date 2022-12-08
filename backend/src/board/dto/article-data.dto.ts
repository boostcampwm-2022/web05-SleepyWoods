import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { articleCategory } from '../article.enum';

export class ArticleDataDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(36)
  content: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(36)
  category: articleCategory;
}
