import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TasksService], // <-- export it so other modules can use it
})
export class TasksModule {}
