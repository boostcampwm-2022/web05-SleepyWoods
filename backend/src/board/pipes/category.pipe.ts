import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { articleCategory } from '../article.enum';
import { ArticleDataDto } from '../dto/article-data.dto';

export class articleCategoryValidationPipe implements PipeTransform {
  readonly categoryOptions: string[] = Object.values(articleCategory);

  transform(value: ArticleDataDto, metadata: ArgumentMetadata) {
    const category = value.category.toLowerCase();
    if (!this.isValid(category)) {
      throw new BadRequestException(`${category} can't be the category`);
    }
    return value;
  }

  private isValid(category: string): boolean {
    return this.categoryOptions.includes(category);
  }
}
