import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  // Get all tasks for a specific user
  async findAll(userId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { userId } });
  }

async create(body: any, userId: number) {
  const task = this.taskRepository.create({
    ...body,
    user: { id: userId }, // assign the user object for FK
  });
  return this.taskRepository.save(task);
}


  // Update task by id
  async update(id: number, updateData: Partial<Task>): Promise<Task> {
    await this.taskRepository.update(id, updateData);
    return this.taskRepository.findOneBy({ id });
  }

  // Remove task by id
  async remove(id: number): Promise<{ deleted: boolean }> {
    const result = await this.taskRepository.delete(id);
    return { deleted: result.affected > 0 };
  }

async findByUser(userId: number) {
  return this.taskRepository.find({
    where: { userId }, // ✅ matches your entity
  });
}


}
