import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'people' })
export class Person {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    fullname!: string;

    @Column()
    gender!: string;

    @Column()
    phone!: string;

    @Column()
    age!: number;

    @Column({ name: 'created_at' })
    createdAt?: Date;
}