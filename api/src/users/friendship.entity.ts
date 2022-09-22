import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './users.entity';

@Entity({name: 'friendships' })
export class Friendship {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.username, {onDelete: 'CASCADE'})
    @Column('varchar', { nullable: false})
    sender: User;
    
    @ManyToOne(() => User, (user) => user.username, {onDelete: 'CASCADE'})
    @Column('varchar', { nullable: false})
    receiver: User;
}