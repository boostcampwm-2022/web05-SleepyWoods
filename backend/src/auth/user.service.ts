import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDataDto } from './dto/user-data.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async createUser(signupData: any): Promise<void> {
    await this.userRepository.save(signupData);
  }

  async findUser(searchOptions: object): Promise<User> {
    return await this.userRepository.findOneBy(searchOptions);
  }

  async deleteUser(userDataToDelete: UserDataDto) {
    await this.userRepository.update(userDataToDelete, { deleted: true });
  }
}
