import { Exclude } from 'class-transformer';
import { IsEmail, MinLength } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: true })
  public firstName: string;

  @Column({ nullable: true })
  public lastName: string;

  @Column({ unique: true })
  public username!: string;

  @Column({ unique: true })
  @IsEmail()
  public email!: string;

  @Column()
  @MinLength(3)
  @Exclude()
  public password!: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
