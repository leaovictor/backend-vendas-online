import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { UserEntity } from 'src/interfaces/user.entity';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds = 10;

    const passwordHashed = await hash(createUserDto.password, saltOrRounds);

    return this.userRepository.save({
      ...createUserDto,
      typeUser: 1,
      password: passwordHashed,
    });

    // const user: UserEntity = {
    //   ...createUserDto,
    //   id: this.users.length + 1,
    //   password: passwordHashed,
    // };

    // this.users.push(user);

    // return user;
  }
  async getAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
