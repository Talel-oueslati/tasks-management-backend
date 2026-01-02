import { Injectable } from '@nestjs/common';
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../tasks/task.entity';

@Injectable()
export class AiService {
  constructor(private readonly tasksService: TasksService) {}

  async summarizeUserTasks(userId: number): Promise<string> {
    const tasks: Task[] = await this.tasksService.findByUser(userId);

    if (!tasks || tasks.length === 0) {
      return 'You have no tasks assigned.';
    }

    const priorityWeight = {
      HIGH: 3,
      MEDIUM: 2,
      LOW: 1,
    };

    const sorted = tasks.sort(
      (a, b) =>
        (priorityWeight[b.priority] || 0) -
        (priorityWeight[a.priority] || 0),
    );

    const urgent = sorted[0];

    return `You have ${tasks.length} tasks. The most urgent task is "${urgent.title}" with priority ${urgent.priority}.`;
  }
}
