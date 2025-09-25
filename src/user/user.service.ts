import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  create(data: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

async findAll(): Promise<User[]> {
  return this.userRepo.createQueryBuilder("user")
    .getMany();
}

async findByCity(city: string): Promise<User[]> {
  return this.userRepo.createQueryBuilder("user")
    .where("user.city ILIKE :city", { city: `%${city}%` }) 
    .getMany();
}

async findByRole(role: UserRole): Promise<User[]> {
    return this.userRepo
      .createQueryBuilder('user')
      .where('user.role = :role', { role })
      .getMany();
  }

async update(id: string, body: Partial<CreateUserDto>): Promise<User> {
  await this.userRepo.createQueryBuilder()
    .update(User)
    .set(body)
    .where("id = :id", { id })
    .execute();

  return this.userRepo.findOneByOrFail({ id });
}

async remove(id: string): Promise<void> {
  await this.userRepo.createQueryBuilder()
    .delete()
    .from(User)
    .where("id = :id", { id })
    .execute();
}
}
