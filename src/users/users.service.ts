import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/users.schema';
import { Model } from 'mongoose';
import { find } from 'lodash';


@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private UserModel: Model<User>) { }


  async create(createUserDto: CreateUserDto) {
    const user = await this.UserModel.create(createUserDto);
    return user.save();
  }

  async findByEmail(email: string) {
    return await this.UserModel.findOne({ where: { email } });
  }

  findAll() {
    return this.UserModel.find();
  }

  findUserById(id: string) {
    return this.UserModel.findById(id).select('-password');
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.UserModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
