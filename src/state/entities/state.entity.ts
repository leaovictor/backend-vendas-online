import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'state' })
export class StateEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'name', nullable: false })
  name: number;

  @CreateDateColumn({ name: 'created_at' })
  createAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
