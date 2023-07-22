import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  create(email: string, password: string, salt: string): Promise<UserEntity> {
    const user = new UserEntity();
    user.email = email;
    user.password = password;
    user.salt = salt;
    return this.usersRepository.save(user);
  }

  findOneById(id: number): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ email });
  }
}
