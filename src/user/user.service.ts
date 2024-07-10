import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Sequelize } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  /**
   * Create a new user
   * @param user User object
   */
  async create(user: CreateUserDto): Promise<CreateUserDto> {
    user.createdAt = new Date();
    user.updatedAt = new Date();
    // check email before creating a new user
    const existingUser = await this.findByEmail(user.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }
    await this.userModel.create(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  /**
   * Find a user by id
   * @param id
   */
  async findOne(id: string): Promise<User> {
    return this.userModel.findByPk(id);
  }

  /**
   * Find a user by email
   * @param email
   */
  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { email } });
  }

  /**
   * Find users with upcoming birthdays in the next week
   */
  async findUsersWithUpcomingBirthdays(): Promise<User[]> {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    const start = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const end = `${String(nextWeek.getMonth() + 1).padStart(2, '0')}-${String(nextWeek.getDate()).padStart(2, '0')}`;

    return await this.userModel.findAll({
      where: Sequelize.literal(`
                DATE_FORMAT(dob, '%m-%d') BETWEEN '${start}' AND '${end}'
            `),
    });
  }
}
