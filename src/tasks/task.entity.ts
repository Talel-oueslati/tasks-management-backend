import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;
  @Column({ type: "datetime", nullable: true }) // new field
  deadline: Date;
  @Column()
  priority: 'LOW' | 'MEDIUM' | 'HIGH';

  @Column()
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';

  @Column()
  dueDate: Date;

    // <-- Make sure this exists
  @Column()
  userId: number;

  @ManyToOne(() => User, user => user.tasks, { onDelete: 'CASCADE' })
  user: User;
}
