import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AiService } from './ai.service';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('summary')
  async getSummary(@Req() req: Request) {
const userId = (req as any).user.userId;
    return {
      summary: await this.aiService.summarizeUserTasks(userId),
    };
  }
}
