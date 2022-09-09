import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  intraId: number;

  @Column()
  displayname: string;

  @Column()
  username: string;

  @Column()
  picture: string;

  @Column()
  wins: number;

  @Column()
  losses: number;
}
