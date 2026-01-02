import { Controller, Get, Post, Body, Param, Put, Delete, Req, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport'; // or your JWT guard
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(@Req() req) {
    return this.tasksService.findAll(req.user.id);
  }

@Post()
@UseGuards(JwtAuthGuard)
async create(@Body() body: any, @Request() req) {
  const userId = req.user.userId;
  return this.tasksService.create({
    title: body.title,
    priority: body.priority || "MEDIUM",
    status: body.status || "TODO",
    deadline: body.deadline ? new Date(body.deadline) : null,
  }, userId);
}


  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateTask(@Param('id') id: number, @Body() body) {
    return this.tasksService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteTask(@Param('id') id: number) {
    return this.tasksService.remove(id);
  }
}
