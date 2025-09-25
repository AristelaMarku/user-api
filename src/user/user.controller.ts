// src/user/user.controller.ts
import { Controller, Get, Post, Body, Param, Query, Patch, Delete, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRole } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto, description: 'User creation payload' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: User })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  create(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'List of users retrieved successfully', type: [User] })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('city/:city')
  @ApiOperation({ summary: 'Retrieve users by city' })
  @ApiParam({ name: 'city', description: 'City name to filter users' })
  @ApiResponse({ status: 200, description: 'List of users filtered by city', type: [User] })
  @ApiResponse({ status: 404, description: 'No users found in this city' })
  async findByCity(@Param('city') city: string): Promise<User[]> {
      const users = await this.userService.findByCity(city);
  if (!users.length) {
    throw new NotFoundException(`No users found in city: ${city}`);
  }
    return users;
  }

  @Get('role/:role')
  @ApiOperation({ summary: 'Get all users by role' })
  @ApiParam({ name: 'role', description: 'Role of the users to filter', enum: UserRole })
  @ApiResponse({ status: 200, description: 'List of users filtered by role', type: [User] })
  @ApiResponse({ status: 404, description: 'No users found with this role' })
  async findByRole(@Param('role') role: UserRole): Promise<User[]> {
    const users = await this.userService.findByRole(role);
    if (users.length === 0) {
     throw new NotFoundException(`No users found with role ${role}`);
    }
    return users;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the user' })
  @ApiBody({ type: CreateUserDto, description: 'User fields to update (partial allowed)' })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.'})
  @ApiResponse({ status: 404, description: 'User not found' })
  update(@Param('id') id: string, @Body() body: Partial<CreateUserDto>): Promise<User> {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
