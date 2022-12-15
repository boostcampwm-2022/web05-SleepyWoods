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
    const val = value.category;
    if (!this.isValid(val)) {
      throw new BadRequestException(`${val} can't be the category`);
    }
    return value;
  }

  private isValid(category: string): boolean {
    return this.categoryOptions.includes(category);
  }
}
