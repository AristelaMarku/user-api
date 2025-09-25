import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let userService: jest.Mocked<UserService>;

  beforeEach(async () => {
    const userServiceMock = {
      create: jest.fn(),
      findAll: jest.fn(),
      findByCity: jest.fn(),
      findByRole: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOneByOrFail: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue({
              where: jest.fn().mockReturnThis(),
              getMany: jest.fn(),
              update: jest.fn().mockReturnThis(),
              delete: jest.fn().mockReturnThis(),
              set: jest.fn().mockReturnThis(),
              from: jest.fn().mockReturnThis(),
              execute: jest.fn(),
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create should call UserService.create and return a user', async () => {
    const createUserDto: CreateUserDto = { firstName: 'Test User',lastName: 'Test User',email:'test@gmail', city: 'New York', role: UserRole.USER };
    const user = { id: '1', ...createUserDto };
    userService.create.mockResolvedValue(user);

    const result = await controller.create(createUserDto);
    expect(userService.create).toHaveBeenCalledWith(createUserDto);
    expect(result).toEqual(user);
  });

  it('findAll should call UserService.findAll and return users', async () => {
    const users = [{ id:'d234cse',firstName: 'Test User',lastName: 'Test User',email:'test@gmail', city: 'New York', role: UserRole.USER }];
    userService.findAll.mockResolvedValue(users);

    const result = await controller.findAll();
    expect(userService.findAll).toHaveBeenCalled();
    expect(result).toEqual(users);
  });

  it('findByCity should call UserService.findByCity and return users', async () => {
    const city = 'New York';
    const users = [{ id:'d234cse',firstName: 'Test User',lastName: 'Test User',email:'test@gmail', city: 'New York', role: UserRole.USER }];
    userService.findByCity.mockResolvedValue(users);

    const result = await controller.findByCity(city);
    expect(userService.findByCity).toHaveBeenCalledWith(city);
    expect(result).toEqual(users);
  });

  it('findByRole should call UserService.findByRole and return users', async () => {
    const role = UserRole.ADMIN;
    const users = [{ id:'d234cse',firstName: 'Test User',lastName: 'Test User',email:'test@gmail', city: 'New York', role: UserRole.USER }];
    userService.findByRole.mockResolvedValue(users);

    const result = await controller.findByRole(role);
    expect(userService.findByRole).toHaveBeenCalledWith(role);
    expect(result).toEqual(users);
  });


  it('remove should call UserService.remove', async () => {
    userService.remove.mockResolvedValue(undefined);

    await controller.remove('1');
    expect(userService.remove).toHaveBeenCalledWith('1');
  });
});