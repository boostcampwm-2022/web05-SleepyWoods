import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDataDto, UserIdentifierDto } from './dto/user-data.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async createUser(signupData: UserDataDto): Promise<void> {
    try {
      await this.userRepository.update(
        { social: signupData['social'], id: signupData['id'] },
        {
          nickname: signupData['nickname'],
          characterName: signupData['characterName'],
        }
      );
    } catch (e) {
      console.log(e);
      throw new NotAcceptableException('닉네임이 중복됩니다.');
    }
  }

  async findUser(searchOptions: UserIdentifierDto): Promise<User> {
    try {
      return await this.userRepository.findOneBy(searchOptions);
    } catch (e) {
      throw new NotFoundException('유저를 찾는 데 실패하였습니다.');
    }
  }

  async deleteUser(userDataToDelete: UserIdentifierDto) {
    try {
      await this.userRepository.update(userDataToDelete, { deleted: true });
    } catch (e) {
      throw new NotFoundException(
        '해당 유저를 찾을 수 없어 삭제할 수 없습니다.'
      );
    }
  }

  async getUserIdByNickname(nickname: string): Promise<string> {
    try {
      const userData = await this.userRepository.findOneBy({ nickname });
      return userData.id;
    } catch (e) {
      throw new NotFoundException(
        '해당 닉네임을 가진 유저를 찾을 수 없습니다.'
      );
    }
  }
}
