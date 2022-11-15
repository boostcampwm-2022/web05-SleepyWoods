import {
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  test() {
    return 'hello';
  }

  @Post()
  signUp(@Query('social') social: string) {
    if (!social) {
      throw new NotFoundException('Invalid Social');
    }
    console.log(social);
  }
}

/**
 * sleepywoods/user post
 */
