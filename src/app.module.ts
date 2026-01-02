import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { AiModule } from './ai/ai.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true, // ✅ CORRECT PLACE
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'task_manager_db',
      autoLoadEntities: true,
      synchronize: true, // ⚠️ only for dev
    }),
    UsersModule,
    TasksModule,
    AuthModule,
    AiModule,
    
  ],
})
export class AppModule {}
